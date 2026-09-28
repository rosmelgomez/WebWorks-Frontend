import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-navbar-inicio',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-inicio.component.html',
  styleUrl: './navbar-inicio.component.css'
})
export class NavbarInicioComponent {
  menuOpen = signal(false);

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen.update(open => !open);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  // "Como funciona" vive en la pagina de inicio; desde otras rutas primero navega
  goToHowItWorks() {
    this.closeMenu();
    this.router.navigateByUrl('/pageInicio').then(() => {
      setTimeout(() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' }));
    });
  }
}
