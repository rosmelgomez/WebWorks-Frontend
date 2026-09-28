import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RepositoryService } from '../../../services/repository.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Repository } from '../../../model/repository';
import { SubscriptionService } from '../../../services/subscription.service';
import { SubscriptionCheck } from '../../../modelComplement/subscriptioCheck';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-agregar-repositorio',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './agregar-repositorio.component.html',
  styleUrl: './agregar-repositorio.component.css'
})
export class AgregarRepositorioComponent implements OnInit {
  public repositorioForm!: FormGroup;
  dataSource = { data: [] as Repository[] };
  public id: number | null = null;
  isEditMode = false;
  hasActiveSubscription = true;
  maxProjectsAllowed = 2;
  activePlanName = '';
  isLoading = false;
  loadError = '';

  constructor(
    private fb: FormBuilder,
    private repositoryService: RepositoryService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.clear();
    this.reactiveForm();
    this.numberRepository();
  }

  reactiveForm() {
    this.repositorioForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      numberProject: [1, [Validators.required, Validators.min(1)]],
    });

    const idSave = this.repositoryService.getIdSave();
    const userId = parseInt(this.userService.getId());

    if (idSave != null) {
      this.isEditMode = true;
      this.id = parseInt(idSave);
      this.isLoading = true;
      this.repositoryService.getRepositoryById(this.id).subscribe({
        next: (data: Repository) => {
          this.repositorioForm.get('name')!.setValue(data.name);
          this.repositorioForm.get('description')!.setValue(data.description);
          this.repositorioForm.get('numberProject')!.setValue(data.numberProject);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.loadError = 'No se pudo cargar el repositorio.';
        }
      });
    } else {
      this.isEditMode = false;
      this.id = null;
      this.isLoading = true;
      this.subscriptionService.checkSubscription(userId).subscribe({
        next: (check: SubscriptionCheck) => {
          this.hasActiveSubscription = !!check.status;
          if (check.status) {
            this.maxProjectsAllowed = check.maxNumberProject || 2;
            this.activePlanName = check.planName || '';
          }
          this.isLoading = false;
        },
        error: () => {
          this.hasActiveSubscription = false;
          this.isLoading = false;
        }
      });
    }
  }

  numberRepository() {
    const userId = parseInt(this.userService.getId());
    if (!isNaN(userId)) {
      this.repositoryService.getRepositoriesUser(userId).subscribe({
        next: (data: Repository[]) => {
          this.dataSource.data = data;
        }
      });
    }
  }

  addOrUpdate() {
    if (this.repositorioForm.valid) {
      if (!this.isEditMode && !this.hasActiveSubscription) {
        alert('Necesitas una suscripción activa antes de registrar repositorios.');
        return;
      }

      const numProject = parseInt(this.repositorioForm.get('numberProject')!.value);
      if (!this.isEditMode && numProject > this.maxProjectsAllowed) {
        alert(`La capacidad del repositorio debe estar entre 1 y ${this.maxProjectsAllowed} proyectos según tu plan (${this.activePlanName || 'activo'}).`);
        return;
      }

      const repository: Repository = {
        id: this.id || 0,
        name: this.repositorioForm.get('name')!.value,
        description: this.repositorioForm.get('description')!.value,
        dateCreate: new Date(),
        numberProject: numProject,
        id_user: parseInt(this.userService.getId())
      };

      this.createOrUpdate(repository);
    } else {
      alert('Por favor completa todos los datos requeridos.');
    }
  }

  createOrUpdate(repository: Repository) {
    if (!this.isEditMode) {
      this.repositoryService.andRepository(repository).subscribe({
        next: (check: boolean) => {
          if (check) {
            this.repositorioForm.reset();
            this.repositoryService.deleteDateSave();
            this.router.navigateByUrl('/listRepositorio');
          } else {
            alert('Error al registrar el repositorio.');
          }
        },
        error: (err) => {
          const msg = err?.error?.message || 'Error al registrar el repositorio.';
          alert(msg);
        }
      });
    } else {
      repository.id = this.id!;
      this.repositoryService.update(repository).subscribe({
        next: (check: boolean) => {
          if (check) {
            this.repositorioForm.reset();
            this.repositoryService.deleteDateSave();
            this.router.navigateByUrl('/listRepositorio');
          } else {
            alert('Error al actualizar el repositorio.');
          }
        },
        error: (err) => {
          const msg = err?.error?.message || 'Error al actualizar el repositorio.';
          alert(msg);
        }
      });
    }
  }

  deleteDateSave() {
    this.repositoryService.deleteDateSave();
  }

}
