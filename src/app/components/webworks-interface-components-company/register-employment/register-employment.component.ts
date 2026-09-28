import {Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CompanyService} from "../../../services/company.service";
import {EmploymentService} from "../../../services/employment.service";
import {Employment} from "../../../model/employment";

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-register-employment',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-employment.component.html',
  styleUrl: './register-employment.component.css'
})
export class RegisterEmploymentComponent implements OnInit{
  public employmentForm!: FormGroup;
  public id: number | null = null;
  isLoading = false;
  loadError = '';

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    public employmentService: EmploymentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm(): void {
    this.employmentForm = this.fb.group({
      title: ['', Validators.required],
      position: ['', Validators.required],
      description: ['', Validators.required],
      vacancies: ['', [Validators.required, Validators.min(1)]],
      dateMaxPostulation: ['', Validators.required],
    });

    const idEmployment = this.employmentService.getIdEmployment();
    if(idEmployment != null){
      this.isLoading = true;
      this.id = parseInt(idEmployment);
      this.employmentService.getEmploymentById(this.id).subscribe({
        next: (data: Employment) => {
          this.employmentForm.get('title')!.setValue(data.title);
          this.employmentForm.get('position')!.setValue(data.position);
          this.employmentForm.get('description')!.setValue(data.description);
          this.employmentForm.get('vacancies')!.setValue(data.vacancies);
          this.employmentForm.get('dateMaxPostulation')!.setValue(data.dateMaxPostulation);
          this.id = data.id;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.loadError = 'No se pudo cargar el empleo.';
        }
      });
    } else {
      this.id = null;
    }
  }

  addOrUpdate(){
    if(this.employmentForm.valid){
      const companyId = parseInt(this.companyService.getIdCompany());
      if (isNaN(companyId)) {
        alert('No se pudo identificar a la empresa.');
        return;
      }

      const employment: Employment = {
        id: this.id || 0,
        title: this.employmentForm.get("title")!.value,
        position: this.employmentForm.get("position")!.value,
        description: this.employmentForm.get("description")!.value,
        vacancies: this.employmentForm.get("vacancies")!.value,
        contracted: 0,
        dateMaxPostulation: this.employmentForm.get("dateMaxPostulation")!.value,
        id_company: companyId,
      };

      if(this.id == null){
        this.employmentService.addEmployment(employment).subscribe({
          next: (check: boolean) => {
            if(check){
              this.employmentService.deleteIdEmployment();
              this.router.navigateByUrl("/listEmployment");
            } else {
              alert("Error al registrar empleo");
            }
          },
          error: (err) => {
            alert(err?.error?.message || "Error al registrar empleo");
          }
        });
      } else {
        employment.id = this.id;
        this.employmentService.updateEmployment(employment).subscribe({
          next: (check: boolean) => {
            if(check){
              this.employmentService.deleteIdEmployment();
              this.router.navigateByUrl("/listEmployment");
            } else {
              alert("Error al actualizar empleo");
            }
          },
          error: (err) => {
            alert(err?.error?.message || "Error al actualizar empleo");
          }
        });
      }
    } else {
      alert("Por favor completa todos los campos requeridos.");
    }
  }
}
