import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RepositoryService } from '../../../services/repository.service';
import ApexCharts from 'apexcharts'
import {Repository} from "../../../model/repository";
import {SubscriptionService} from "../../../services/subscription.service";

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-list-repositorio',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,],
  templateUrl: './list-repositorio.component.html',
  styleUrl: './list-repositorio.component.css'
})

export class ListRepositorioComponent implements OnInit {

  private chart: ApexCharts | null = null;
  displayedColumns: string[] = ['name', 'description', 'datePublication', 'quantityProject', 'actions'];
  dataSource = { data: [] as Repository[] }
  isLoading = true;
  loadError = '';

  constructor(
    private repositoryService: RepositoryService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.clear();
    this.getRepositoriesUser()
  }

  getRepositoriesUser() {
     this.isLoading = true;
     this.loadError = '';
     this.repositoryService.getRepositoriesUser(parseInt(this.userService.getId())).subscribe({
       next: (data: Repository[]) => {
       this.dataSource.data = data
       this.isLoading = false;
       this.grafico(data);
     }, error: () => {
       this.isLoading = false;
       this.loadError = 'No se pudieron cargar los repositorios.';
     }})
  }

  saveDate(id:number,name:string,numProjects:number){
    this.repositoryService.saveDateImport(id,name,numProjects)
  }

  deleteDateSave(){
    this.repositoryService.deleteDateSave();
    this.router.navigateByUrl("/agregarRepositorio");
  }

  delete(id:number){
    this.repositoryService.delete(id).subscribe({
      next: () => {
        this.getRepositoriesUser();
        this.router.navigate(["/listRepositorio"]).then(()=>"redireccionando")
      },error(_err:any){
      }
    })

  }

  grafico(repositorio:Repository[]) {
    const options= {
      series: repositorio.map(repositorio => repositorio.numberProject),
      chart: {
        type: 'donut',
        height: 350
      },
      labels: repositorio.map(repositorio => '' + repositorio.name),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      title: {
        text: 'Repositorios con respecto a su cantidad de proyectos '
      }
    };

  if (this.chart) {
    this.chart.destroy();
  }

  this.chart = new ApexCharts(document.querySelector("#chart"), options);
  this.chart.render().then(() => "Todo correcto");
}

}
