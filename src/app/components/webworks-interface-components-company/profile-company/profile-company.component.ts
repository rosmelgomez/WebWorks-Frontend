import {Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Company} from "../../../model/company";
import {AuthService} from "../../../services/auth.service";
import {CompanyService} from "../../../services/company.service";

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-profile-company',
  standalone: true,
    imports: [
      CommonModule,
      RouterModule,
    ],
  templateUrl: './profile-company.component.html',
  styleUrl: './profile-company.component.css'
})
export class ProfileCompanyComponent  implements  OnInit{
  dataSource = { data: [] as Company[] }
  isLoading = true;
  loadError = '';
  constructor(
    private companyService:CompanyService,
    private authService:AuthService,) {
  }
  ngOnInit(): void {
    this.getCompany()
  }
  getCompany() {
    this.isLoading = true;
    this.companyService.getCompany(this.authService.getUser() || "").subscribe({ next: (data: Company) => {
      this.dataSource.data=[data]
      this.isLoading = false;
    }, error: () => {
      this.isLoading = false;
      this.loadError = 'No se pudo cargar el perfil.';
    }})
  }

}
