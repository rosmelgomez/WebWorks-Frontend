import {Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Company} from "../../../model/company";
import {AuthService} from "../../../services/auth.service";
import {CompanyService} from "../../../services/company.service";
import {EmploymentService} from "../../../services/employment.service";
@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-page-company',
  standalone: true,
    imports: [
        CommonModule,
        RouterModule,
    ],
  templateUrl: './page-company.component.html',
  styleUrl: './page-company.component.css'
})
export class PageCompanyComponent implements OnInit{
  dataSource = { data: [] as Company[] }
  isLoading = true;
  loadError = '';
 constructor(
   private authService:AuthService,
   private companyService:CompanyService,
   private employmentService:EmploymentService,
 ) {}
 ngOnInit() {
    console.clear()
   this.getCompany();
 }

 getCompany(){
    this.isLoading = true;
    this.companyService.getCompany(this.authService.getUser() || "").subscribe({ next: (data: Company)=>{
      this.dataSource.data=[data]
      this.isLoading = false;
    }, error: () => {
      this.isLoading = false;
      this.loadError = 'No se pudo cargar la empresa.';
    }})
 }

 deleteDataSave(){
 this.employmentService.deleteIdEmployment()

 }

}
