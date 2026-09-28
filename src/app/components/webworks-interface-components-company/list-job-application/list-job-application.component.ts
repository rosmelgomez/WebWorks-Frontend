import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {JobApplicationService} from "../../../services/jobapplication";
import {CompanyService} from "../../../services/company.service";
import {JobApplicationSummary} from "../../../modelComplement/jobApplicationSummary";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {UserService} from "../../../services/user.service";

const userIcon = `
<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/></svg>
`;

const userCheckIcon = `
<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
  <path d="m8,12c3.309,0,6-2.691,6-6S11.309,0,8,0,2,2.691,2,6s2.691,6,6,6Zm3,2h-6c-2.757,0-5,2.243-5,5v5h16v-5c0-2.757-2.243-5-5-5Zm12.957-4.52l-4.926,4.926c-.396.395-.915.593-1.434.593s-1.038-.198-1.433-.592l-2.871-2.871,1.414-1.414,2.87,2.871,4.965-4.926,1.414,1.414Z"/>
</svg>`;

const userRefuseIcon = `
<svg id="Layer_1" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m3 6a6 6 0 1 1 6 6 6.006 6.006 0 0 1 -6-6zm6 8a9.01 9.01 0 0 0 -9 9 1 1 0 0 0 1 1h16a1 1 0 0 0 1-1 9.01 9.01 0 0 0 -9-9zm12.414-2 2.293-2.293a1 1 0 0 0 -1.414-1.414l-2.293 2.293-2.293-2.293a1 1 0 0 0 -1.414 1.414l2.293 2.293-2.293 2.293a1 1 0 1 0 1.414 1.414l2.293-2.293 2.293 2.293a1 1 0 0 0 1.414-1.414z"/></svg>
`;

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-list-job-application',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,],
  templateUrl: './list-job-application.component.html',
  styleUrl: './list-job-application.component.css'
})
export class ListJobApplicationComponent implements OnInit {
  displayedColumnsPending: string[] = ['id', 'status', 'dateApplication','namePostulation','nameEmployment','positionEmployment', 'actions'];
  dataSourcePending = { data: [] as JobApplicationSummary[] };

  displayedColumnsAccepted: string[] = ['id', 'status', 'dateApplication','namePostulation','nameEmployment','positionEmployment', 'actions'];
  dataSourceAccepted = { data: [] as JobApplicationSummary[] };

  displayedColumnsRefuse: string[] = ['id', 'status', 'dateApplication','namePostulation','nameEmployment','positionEmployment', 'actions'];
  dataSourceRefuse = { data: [] as JobApplicationSummary[] };
  filterPending = '';
  filterAccepted = '';
  filterRefuse = '';
  loadingPending = true;
  loadingAccepted = true;
  loadingRefuse = true;
  errorPending = '';
  errorAccepted = '';
  errorRefuse = '';

  applyFilterPending(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterPending = filterValue.trim().toLowerCase();
  }

  applyFilterAccepted(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterAccepted = filterValue.trim().toLowerCase();
  }
  applyFilterRefuse(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterRefuse = filterValue.trim().toLowerCase();
  }

  constructor(
    private jobApplicationService: JobApplicationService,
    private companyService: CompanyService,
    private userService: UserService,
    ) {}

  ngOnInit() {
    this.getJobApplicationPendingByCompany()
    this.getJobApplicationAcceptedByCompany()
    this.getJobApplicationRefuseByCompany()
  }

  getJobApplicationPendingByCompany(){
  this.loadingPending = true;
  this.jobApplicationService.getJobApplicationStatusByCompany(parseInt(this.companyService.getIdCompany()),"PENDING").subscribe({
    next: (jobApplications :JobApplicationSummary[])=>{
      this.dataSourcePending.data = jobApplications;
      this.loadingPending = false;
    }, error: () => {
      this.loadingPending = false;
      this.errorPending = 'No se pudieron cargar las postulaciones pendientes.';
    }})}

  getJobApplicationAcceptedByCompany(){
    this.loadingAccepted = true;
    this.jobApplicationService.getJobApplicationStatusByCompany(parseInt(this.companyService.getIdCompany()),"ACCEPTED").subscribe({
      next: (jobApplications :JobApplicationSummary[])=>{
        this.dataSourceAccepted.data = jobApplications;
        this.loadingAccepted = false;
      }, error: () => {
        this.loadingAccepted = false;
        this.errorAccepted = 'No se pudieron cargar las postulaciones aceptadas.';
      }})
  }

  getJobApplicationRefuseByCompany(){
    this.loadingRefuse = true;
    this.jobApplicationService.getJobApplicationStatusByCompany(parseInt(this.companyService.getIdCompany()),"REFUSE").subscribe({
      next: (jobApplications :JobApplicationSummary[])=>{
        this.dataSourceRefuse.data = jobApplications;
        this.loadingRefuse = false;
      }, error: () => {
        this.loadingRefuse = false;
        this.errorRefuse = 'No se pudieron cargar las postulaciones rechazadas.';
      }})
  }

  saveIdUser(idUser:number){
    this.userService.saveUserId(idUser)
  }

  acceptedJobApplication(idJobApplication:number) {
    this.jobApplicationService.changeJobApplication(idJobApplication,"ACCEPTED").subscribe(
      (confirm:Boolean)=>{
        if(confirm){
          this.getJobApplicationPendingByCompany();
          this.getJobApplicationAcceptedByCompany()
        }
      }
    )
  }
  refuseJobApplication(idJobApplication:number) {
    this.jobApplicationService.changeJobApplication(idJobApplication,"REFUSE").subscribe(
      (confirm:Boolean)=>{
        if(confirm){
          this.getJobApplicationPendingByCompany();
          this.getJobApplicationAcceptedByCompany()
          this.getJobApplicationRefuseByCompany()
        }
      }
    )
  }

  filtered(items: JobApplicationSummary[], term: string): JobApplicationSummary[] {
    if (!term) return items;
    return items.filter(item => JSON.stringify(item).toLowerCase().includes(term));
  }

}
