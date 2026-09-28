import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Auth } from '../../../model/Auth';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent implements OnInit {
  hide = signal(true);
  submitting = signal(false);
  errorMessage = signal<string | null>(null);

  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  togglePassword() {
    this.hide.update(hidden => !hidden);
  }

  invalid(control: string): boolean {
    const field = this.loginForm.get(control);
    return !!field && field.invalid && field.touched;
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage.set('Escribe tu usuario y tu contraseña.');
      return;
    }
    const user: Auth = {
      username: this.loginForm.get('username')!.value,
      password: this.loginForm.get('password')!.value,
    };
    this.errorMessage.set(null);
    this.submitting.set(true);
    this.authService.login(user).subscribe({
      next: () => {
        this.submitting.set(false);
        const role = this.authService.getRole();
        if (role === 'DEVELOPER') {
          this.router.navigateByUrl('/pageUser');
        } else if (role === 'COMPANY') {
          this.router.navigateByUrl('/pageCompany');
        }
      },
      error: () => {
        this.submitting.set(false);
        this.loginForm.get('password')!.reset();
        this.errorMessage.set('Usuario o contraseña incorrectos. Revísalos e inténtalo de nuevo.');
      },
    });
  }
}
