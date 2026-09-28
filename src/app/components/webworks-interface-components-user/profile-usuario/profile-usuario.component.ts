import {Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";
import {User} from "../../../model/user";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-profile-usuario',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
  ],
  templateUrl: './profile-usuario.component.html',
  styleUrl: './profile-usuario.component.css'
})
export class ProfileUsuarioComponent  implements  OnInit{
  dataSource = { data: [] as User[] }
  isLoading = true;
  loadError = '';
  constructor(
    private userService: UserService,
    private authService:AuthService,) {
  }

  ngOnInit(): void {
   this.getUser()
  }
  getUser() {
    this.isLoading = true;
    this.userService.getUser(this.authService.getUser() || "").subscribe({ next: (data: User) => {
      this.dataSource.data=[data]
      this.isLoading = false;
    }, error: () => {
      this.isLoading = false;
      this.loadError = 'No se pudo cargar el perfil.';
    }})
  }
}
