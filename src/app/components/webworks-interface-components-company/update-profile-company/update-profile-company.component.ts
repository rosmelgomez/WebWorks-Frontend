import {Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {CompanyService} from "../../../services/company.service";
import {Company} from "../../../model/company";
import {CommonModule} from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-update-profile-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './update-profile-company.component.html',
  styleUrl: './update-profile-company.component.css'
})
export class UpdateProfileCompanyComponent implements OnInit {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  hideNewPassword = signal(true);
  clickEventNewPassword(event: MouseEvent) {
    this.hideNewPassword.set(!this.hideNewPassword());
    event.stopPropagation();
  }
  public updateProfileForm!: FormGroup
  isLoading = true;
  loadError = '';

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.getCompany();
  }

  reactiveForm(): void {
    this.updateProfileForm = this.formBuilder.group({
      ruc: ['', [Validators.required]],
      socialReason: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      legalRepresentative: ['', [Validators.required]],
      description: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    });
  }

  getCompany() {
    this.isLoading = true;
    this.companyService.getCompany(this.authService.getUser() || "").subscribe({ next: (data: Company) => {
      this.updateProfileForm.get('ruc')!.setValue(data.ruc);
      this.updateProfileForm.get('socialReason')!.setValue(data.socialReason);
      this.updateProfileForm.get('sector')!.setValue(data.sector);
      this.updateProfileForm.get('legalRepresentative')!.setValue(data.legalRepresentative);
      this.updateProfileForm.get('description')!.setValue(data.description);
      this.updateProfileForm.get('username')!.setValue(data.username);
      this.isLoading = false;
    }, error: () => {
      this.isLoading = false;
      this.loadError = 'No se pudieron cargar los datos.';
    }});
  }

  update() {
    if (this.updateProfileForm.valid) {
      const company: Company = {
        id: parseInt(this.companyService.getIdCompany()),
        ruc: this.updateProfileForm.get('ruc')!.value,
        socialReason: this.updateProfileForm.get('socialReason')!.value,
        sector: this.updateProfileForm.get('sector')!.value,
        legalRepresentative: this.updateProfileForm.get('legalRepresentative')!.value,
        description: this.updateProfileForm.get('description')!.value,
        username: this.updateProfileForm.get('username')!.value,
        password: this.updateProfileForm.get('newPassword')!.value,
        currentPassword: this.updateProfileForm.get('password')!.value,
        rol: "COMPANY"
      };
      this.companyService.updateCompany(company).subscribe({
        next: (check) => {
          if (check) {
            this.router.navigateByUrl("/profileCompany");
          }
        },
        error: (err) => {
          const message = err?.error?.message || 'Error al actualizar la empresa.';
          alert(message);
        }
      });
    } else {
      alert("ingrese todos los campos");
    }
  }
}
