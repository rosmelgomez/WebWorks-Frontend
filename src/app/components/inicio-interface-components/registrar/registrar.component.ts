import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { Auth } from '../../../model/Auth';
import { AuthService } from '../../../services/auth.service';
import { Company } from '../../../model/company';
import { CompanyService } from '../../../services/company.service';

type Role = 'dev' | 'co';

// la contrasena y su confirmacion deben coincidir
const samePassword = (group: AbstractControl): ValidationErrors | null =>
  group.get('password')?.value === group.get('confirmPassword')?.value ? null : { mismatch: true };

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-registrar',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgTemplateOutlet],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit {
  role = signal<Role>('dev');
  hidePassword = signal(true);
  hideConfirm = signal(true);
  submitting = signal(false);
  errorMessage = signal<string | null>(null);

  public registrarFormUser!: FormGroup;
  public registrarFormCompany!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.registrarFormUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: samePassword });

    this.registrarFormCompany = this.formBuilder.group({
      ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      socialReason: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      legalRepresentative: ['', [Validators.required]],
      description: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: samePassword });

    // pestana inicial segun ?tipo= (developer | empresa) desde la pagina de inicio
    this.route.queryParamMap.subscribe(params => {
      this.role.set(params.get('tipo') === 'empresa' ? 'co' : 'dev');
    });
  }

  get form(): FormGroup {
    return this.role() === 'dev' ? this.registrarFormUser : this.registrarFormCompany;
  }

  setRole(role: Role) {
    this.role.set(role);
    this.errorMessage.set(null);
  }

  // un grupo de campos (un "commit") esta completo cuando todos sus controles son validos
  done(...controls: string[]): boolean {
    return controls.every(name => this.form.get(name)?.valid);
  }

  invalid(control: string): boolean {
    const field = this.form.get(control);
    return !!field && field.invalid && field.touched;
  }

  mismatch(): boolean {
    const confirm = this.form.get('confirmPassword');
    return !!confirm && confirm.touched && !!confirm.value && this.form.hasError('mismatch');
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage.set(this.form.hasError('mismatch') && this.form.get('confirmPassword')?.value
        ? 'Las contraseñas no coinciden.'
        : 'Revisa los campos marcados en rojo.');
      return;
    }
    this.errorMessage.set(null);
    this.submitting.set(true);
    if (this.role() === 'dev') {
      this.registerDeveloper();
    } else {
      this.registerCompany();
    }
  }

  private registerDeveloper() {
    const f = this.registrarFormUser.value;
    const user: User = {
      id: 0,
      name: f.name,
      lastname: f.lastname,
      birthDate: f.birthDate,
      phone: f.phone,
      email: f.email,
      username: f.username,
      password: f.password,
      photo: '',
      rol: 'DEVELOPER',
    };
    this.userService.registrar(user).subscribe({
      next: created => created
        ? this.signIn({ username: user.username, password: user.password }, '/pageUser')
        : this.fail(`El usuario "${user.username}" ya existe. Elige otro nombre de usuario.`),
      error: () => this.fail('No pudimos crear tu cuenta. Inténtalo de nuevo en unos minutos.'),
    });
  }

  private registerCompany() {
    const f = this.registrarFormCompany.value;
    const company: Company = {
      id: 0,
      ruc: f.ruc,
      socialReason: f.socialReason,
      sector: f.sector,
      legalRepresentative: f.legalRepresentative,
      description: f.description,
      username: f.username,
      password: f.password,
      rol: 'COMPANY',
    };
    this.companyService.AddCompany(company).subscribe({
      next: created => created
        ? this.signIn({ username: company.username, password: company.password }, '/pageCompany')
        : this.fail(`El usuario "${company.username}" ya existe. Elige otro nombre de usuario.`),
      error: () => this.fail('No pudimos registrar la empresa. Inténtalo de nuevo en unos minutos.'),
    });
  }

  // tras crear la cuenta se inicia sesion y se entra al area del rol
  private signIn(credentials: Auth, destination: string) {
    this.authService.login(credentials).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigateByUrl(destination);
      },
      error: () => {
        this.submitting.set(false);
        this.router.navigateByUrl('/login');
      },
    });
  }

  private fail(message: string) {
    this.submitting.set(false);
    this.errorMessage.set(message);
  }
}
