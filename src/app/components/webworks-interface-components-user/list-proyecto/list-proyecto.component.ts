import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import ApexCharts from 'apexcharts'
import { Project } from '../../../model/project';
import { ProjectService } from '../../../services/project.service';
import { CommonModule } from '@angular/common';
import {RepositoryService} from "../../../services/repository.service";
@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-list-proyecto',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './list-proyecto.component.html',
  styleUrl: './list-proyecto.component.css'
})
export class ListProyectoComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dateCreate', 'description', 'language', 'actions']
  name: string = ''
  numProjects: string = '';
  dataSource = { data: [] as Project[] }
  isLoading = true;
  loadError = '';
  private chart: ApexCharts | null = null;

  constructor(
    private projectService: ProjectService,
    private repositoryService: RepositoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.clear();
    this.getProjectRepository();
  }

  getProjectRepository() {
      this.isLoading = true;
      this.loadError = '';
      this.projectService.getProjectRepository(parseInt(this.repositoryService.getIdSave())).subscribe({ next: (data: Project[]) => {
          this.dataSource.data = data;
          this.name=this.repositoryService.getNameSave();
          this.numProjects=this.repositoryService.getNumProjectsSave();
          this.isLoading = false;
          this.graphic(data);
    }, error: () => {
      this.isLoading = false;
      this.loadError = 'No se pudieron cargar los proyectos.';
    }})
  }

  saveId(id: number) {
    this.projectService.saveId(id)
    this.router.navigate(["/agregarProyecto"]);
  }
  deleteIdSave(){
    if(this.dataSource.data.length >= parseInt(this.numProjects)){
      alert("usted ya no puede agregar mas proyectos, alcanzo el limite permitido")
      return;
    }
    this.projectService.deleteIdSave();
    this.router.navigate(["/agregarProyecto"]);
  }
  delete(id: number) {
    this.projectService.delete(id).subscribe({
      next: (_data) => {
        this.getProjectRepository();
        this.router.navigate(["/listProyecto"]).then()
      }, error(_err: any) {
      }
    })
  }
  deleteDateTotal(){
    this.repositoryService.deleteDateSave()
    this.projectService.deleteIdSave();
  }

  graphic(project:Project[]) {
    const options= {
    series: project.map(project => project.id),
    chart: {
      type: 'donut',
      height: 350
    },
    labels: project.map(project => '' + project.name),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    title: {
      text: 'Proyecto'
    }
  };
  if (this.chart) {
    this.chart.destroy();
  }

  this.chart = new ApexCharts(document.querySelector("#chart"), options);
  this.chart.render();
}

}
