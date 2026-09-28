import {Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {EmploymentService} from "../../../services/employment.service";
import {UserService} from "../../../services/user.service";
import {JobApplication} from "../../../model/jobApplication";
import {JobApplicationService} from "../../../services/jobapplication";
import {EmploymentSummary} from "../../../modelComplement/employmentSummary";

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-list-employment',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './list-employment.component.html',
  styleUrl: './list-employment.component.css'
})

export class ListEmploymentComponent implements OnInit{
  dataSource = { data: [] as EmploymentSummary[] }
  isLoading = true;
  loadError = '';
  feedbackMessage = '';

  applicationStatuses: { [key: number]: boolean } = {};
  applicationStatusLoading: { [key: number]: boolean } = {};
  applicationStatusErrors: { [key: number]: string } = {};

  constructor(
    private employmentService:EmploymentService,
    private userService:UserService,
    private jobApplicationService:JobApplicationService,
  ) { }

  ngOnInit(): void {
    console.clear()
    this.getEmployment()
  }

  getEmployment(){
    this.isLoading = true;
    this.loadError = '';
    this.employmentService.getEmployments().subscribe({ next: (data: EmploymentSummary[]) => {
      this.dataSource.data = data;
      this.isLoading = false;
      const userId = parseInt(this.userService.getId());
      const employmentIds = data.map(employment => employment.id);

      employmentIds.forEach(employmentId => {
        this.applicationStatusLoading[employmentId] = true;
        this.applicationStatusErrors[employmentId] = '';
        this.jobApplicationService.checkJobApplication(employmentId, userId).subscribe({
          next: (status: boolean) => {
            this.applicationStatuses[employmentId] = status; // Store in map
            this.applicationStatusLoading[employmentId] = false;
          }, error: () => {
            this.applicationStatusLoading[employmentId] = false;
            this.applicationStatusErrors[employmentId] = 'No se pudo cargar el estado de la postulación.';
          }});
      });

    }, error: () => {
      this.isLoading = false;
      this.loadError = 'No se pudieron cargar los empleos.';
    }})
  }

  check(idEmployment: number): boolean {
    return this.applicationStatuses[idEmployment] || false; // Default to false if not loaded yet
  }

  applyAt(idEmployment:number){
    if(idEmployment){
      const jobApplication :JobApplication = {
        id:0,
        status:"PENDING",
        dateApplication:new Date(),
        id_employment:idEmployment,
        id_user:parseInt(this.userService.getId()),
      }
     this.jobApplicationService.addJobApplication(jobApplication).subscribe(
       (check:boolean)=>{
         if(check){
           this.getEmployment()
           this.feedbackMessage = 'We send your job application'
         }else{
           alert("error")}
       }
     )
    }
  }

}
