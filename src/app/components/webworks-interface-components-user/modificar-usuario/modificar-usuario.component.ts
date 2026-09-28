import {Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/user';
import {FileService} from "../../../services/file.service";
import {DomSanitizer} from "@angular/platform-browser";
import {CommonModule} from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-modificar-usuario',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './modificar-usuario.component.html',
  styleUrl: './modificar-usuario.component.css'
})
export class ModificarUsuarioComponent implements OnInit {
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

  file:any
  urlPhoto:string | undefined ;

  public updateProfileForm!: FormGroup
  isLoading = true;
  loadError = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService:AuthService,
    private fileService:FileService,
    private sanitizer:DomSanitizer,
    private router: Router,
  ) { }
  reactiveForm() {
    this.updateProfileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    console.clear();
    this.reactiveForm()
    this.getUser()
  }

  captureImage(event: any ):any{
    this.file =event.target.files[0];
    this.extractBase64(this.file).then( (imagen:any)=>{
      this.urlPhoto=imagen.base as string;
    })
  }

  async extractBase64(file: any): Promise<{ base: string | ArrayBuffer | null }> {
    return new Promise((resolve, reject) => {
      try {
        const url = window.URL.createObjectURL(file);
        this.sanitizer.bypassSecurityTrustUrl(url);
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve({ base: reader.result });
        reader.onerror = (error) => reject(error);
      } catch (error) {
        reject(error);
      }
    });
  }

  getUser( ) {
    this.isLoading = true;
    this.userService.getUser(this.authService.getUser() || "").subscribe({ next: (data: User) => {
      this.updateProfileForm.get('name')!.setValue(data.name);
      this.updateProfileForm.get('lastname')!.setValue(data.lastname);
      this.updateProfileForm.get('birthDate')!.setValue(data.birthDate);
      this.updateProfileForm.get('phone')!.setValue(data.phone);
      this.updateProfileForm.get('email')!.setValue(data.email);
      this.updateProfileForm.get('username')!.setValue(data.username);
      this.urlPhoto="http://localhost:8080/webworks/media/profileAdd.png";
      this.isLoading = false;
    }, error: () => {
      this.isLoading = false;
      this.loadError = 'No se pudieron cargar los datos.';
    }})
  }

  update(){
    if(this.updateProfileForm.valid){
      if(this.file){
        const formData = new FormData();
        formData.append('file',this.file)
        this.fileService.addFile(formData).subscribe({
          next: (urlPhoto:any)=>{
            if(urlPhoto) {
              this.updateProfileUser(urlPhoto);
            }else {
              alert("hubo un error en servidor de subir una imagen ");
            }
          },
          error: (err) => {
            const message = err?.error?.message || 'Error al subir la imagen.';
            alert(message);
          }
        });
      }else{
        this.updateProfileUser("");
      }
    }else{
      alert('ingrese todos los campos');
    }
  }

  updateProfileUser( urlPhoto:any){
    this.userService.getUser(this.authService.getUser() || "").subscribe({
      next: (data: User) => {
        const user: User = {
          id: data.id,
          name: this.updateProfileForm.get('name')!.value,
          lastname: this.updateProfileForm.get('lastname')!.value,
          birthDate: this.updateProfileForm.get('birthDate')!.value,
          phone: this.updateProfileForm.get('phone')!.value,
          email: this.updateProfileForm.get('email')!.value,
          username: this.updateProfileForm.get('username')!.value,
          password: this.updateProfileForm.get('newPassword')!.value,
          currentPassword: this.updateProfileForm.get('password')!.value,
          photo: urlPhoto ? urlPhoto.url : data.photo,
          rol: data.rol
        }

        if (urlPhoto==""){user.photo=data.photo}
        this.userService.updateUser(user).subscribe({
          next: (check) => {
            if (check) {
              this.router.navigateByUrl("/profileUser");
            }
          },
          error: (err) => {
            const message = err?.error?.message || 'Error al actualizar el usuario.';
            alert(message);
          }
        });
      },
      error: () => {
        alert('No se pudieron obtener los datos del usuario.');
      }
    });
  }

}
