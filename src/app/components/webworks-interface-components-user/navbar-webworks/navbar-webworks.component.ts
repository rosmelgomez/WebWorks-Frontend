import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-navbar-webworks',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-webworks.component.html',
  styleUrl: './navbar-webworks.component.css'
})
export class NavbarWebworksComponent {
  // cada seccion del area del developer es un commit en su carril
  readonly items: NavItem[] = [
    { label: 'Inicio', route: '/pageUser' },
    { label: 'Carrito', route: '/subscription' },
    { label: 'Tarjetas', route: '/listMethodPayment' },
    { label: 'Perfil', route: '/profileUser' },
  ];

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router) {}

  logoutUser() {
    this.auth.logout();
    this.userService.deleteDateSave();
    this.router.navigateByUrl('/');
  }
}
