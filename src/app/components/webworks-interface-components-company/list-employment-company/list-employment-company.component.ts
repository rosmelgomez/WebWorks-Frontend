import {Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Employment} from "../../../model/employment";
import {EmploymentService} from "../../../services/employment.service";
import {CompanyService} from "../../../services/company.service";

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-list-employment-company',
  standalone: true,
    imports: [
      RouterModule,
      CommonModule,
    ],
  templateUrl: './list-employment-company.component.html',
  styleUrl: './list-employment-company.component.css'
})
export class ListEmploymentCompanyComponent implements OnInit {

  displayedColumns: string[] = ["title",'position', 'description', 'vacancies','contracted' ,'dateMaxPostulation', 'actions']
  dataSource = { data: [] as Employment[] }
  isLoading = true;
  loadError = '';

  constructor(
    private employmentService:EmploymentService,
    private companyService:CompanyService,
  ) { }

  ngOnInit(): void {
    this.getEmployment()
  }


  getEmployment() {
    this.isLoading = true;
    this.loadError = '';
    this.employmentService.getEmploymentsByCompany(parseInt( this.companyService.getIdCompany())).subscribe({ next: (data: Employment[]) => {
      this.dataSource.data = data;
      this.isLoading = false;
    }, error: () => {
      this.isLoading = false;
      this.loadError = 'No se pudieron cargar los empleos.';
    }})
  }

  saveIdEmployment(id:number){
    this.employmentService.saveIdEmployment(id);
  }

  newEmployment() {
    this.employmentService.deleteIdEmployment();
  }

  deleteEmployment(id:number){
    this.employmentService.deleteEmployment(id).subscribe(
      (check:boolean)=>{
        if(check){
          this.getEmployment()
        }else{
          alert("error")}
      }
    )
  }

}
