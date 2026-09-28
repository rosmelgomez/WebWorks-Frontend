import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../model/project';
import { CommonModule } from '@angular/common';
import { RepositoryService } from '../../../services/repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-agregar-proyecto',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './agregar-proyecto.component.html',
  styleUrl: './agregar-proyecto.component.css'
})
export class AgregarProyectoComponent implements OnInit {

  public projectForm!: FormGroup;
  public id: number | null = null;
  isEditMode = false;
  isLoading = false;
  loadError = '';

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private repositoryService: RepositoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.clear();
    this.reactiveForm();
  }

  reactiveForm(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      language: ['', Validators.required]
    });

    const idUpdate = this.projectService.getIdUpdate();
    if (idUpdate != null) {
      this.isEditMode = true;
      this.id = parseInt(idUpdate);
      this.isLoading = true;
      this.projectService.projectById(this.id).subscribe({
        next: (data: Project) => {
          this.projectForm.get('name')!.setValue(data.name);
          this.projectForm.get('description')!.setValue(data.description);
          this.projectForm.get('language')!.setValue(data.language);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.loadError = 'No se pudo cargar el proyecto.';
        }
      });
    } else {
      this.isEditMode = false;
      this.id = null;
    }
  }

  addOrUpdate() {
    if (this.projectForm.valid) {
      const repoId = this.repositoryService.getIdSave();
      if (!repoId) {
        alert('No se encontró el repositorio seleccionado.');
        this.router.navigateByUrl('/listRepositorio');
        return;
      }

      const project: Project = {
        id: this.id || 0,
        name: this.projectForm.get('name')!.value,
        dateCreate: new Date(),
        description: this.projectForm.get('description')!.value,
        language: this.projectForm.get('language')!.value,
        id_repository: parseInt(repoId),
      };

      if (!this.isEditMode) {
        this.projectService.addProject(project).subscribe({
          next: (data) => {
            if (data) {
              this.projectForm.reset();
              this.router.navigateByUrl("/listProyecto");
            } else {
              alert('Error al crear el proyecto.');
            }
          },
          error: (err: any) => {
            alert(err?.error?.message || 'Error al crear el proyecto.');
          }
        });
      } else {
        project.id = this.id!;
        this.projectService.update(project).subscribe({
          next: (_data) => {
            this.projectForm.reset();
            this.projectService.deleteIdSave();
            this.router.navigate(["/listProyecto"]);
          },
          error: (err: any) => {
            alert(err?.error?.message || 'Error al modificar el proyecto.');
          }
        });
      }
    } else {
      alert('Por favor completa todos los datos requeridos.');
    }
  }
}
