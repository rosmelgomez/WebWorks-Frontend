import {Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";
import {User} from "../../../model/user";
import {UserService} from "../../../services/user.service";
import {RepositoryService} from "../../../services/repository.service";
import {Repository} from "../../../model/repository";
import {ProjectService} from "../../../services/project.service";
import {Project} from "../../../model/project";
import { format } from 'date-fns';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-view-profile-user',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage
  ],
  templateUrl: './view-profile-user.component.html',
  styleUrl: './view-profile-user.component.css'
})
export class ViewProfileUserComponent implements OnInit{

  dataSource = { data: [] as FoodNode[] };
  dataSourceUser = { data: [] as User[] }
  isUserLoading = true;
  userError = '';
  isRepositoriesLoading = true;
  repositoriesError = '';
  repositoryErrors: {[key: string]: string} = {};
  constructor(
    private userService: UserService,
    private repositoryService: RepositoryService,
    private projectService: ProjectService,
    ) {}

  ngOnInit(): void {
    this.getUser()
    this.getRepositoriesUser()
  }

  getUser() {
    this.isUserLoading = true;
    this.userService.getUserById(parseInt( this.userService.getSaveUserId())).subscribe({ next: (dataUser: User) => {
      this.dataSourceUser.data=[dataUser]
      this.isUserLoading = false;
    }, error: () => {
      this.isUserLoading = false;
      this.userError = 'No se pudo cargar el perfil.';
    }})
  }

  getRepositoriesUser() {
  const TREE_DATA: FoodNode[] = [];

  this.isRepositoriesLoading = true;
  this.repositoryService.getRepositoryUserCompany( parseInt( this.userService.getSaveUserId())).subscribe({ next: (repositories: Repository[]) => {
    if (repositories.length === 0) {
      this.dataSource.data = [];
      this.isRepositoriesLoading = false;
    }
    let completed = 0;
    repositories.forEach((repository) => {
      const repositoryNode: FoodNode = {
        name: repository.name.toString(),
        children: []
      };

      this.projectService.getProjectsRepositoryCompany(repository.id).subscribe({ next: (projects: Project[]) => {
        repositoryNode.children = projects.map((project) => {
          const formattedDate = format(new Date(project.dateCreate), 'dd/MM/yyyy');

          return {
            name:'Project: '+ project.name.toString(),
            children: [
              { name:'language: '+ project.language.toString() },
              { name:'description: '+ project.description.toString() },
              { name:'Date Create: '+ formattedDate }
            ]
          };
        });

        TREE_DATA.push(repositoryNode);
        this.dataSource.data = TREE_DATA;
        completed++;
        if (completed === repositories.length) this.isRepositoriesLoading = false;
      }, error: () => {
        this.repositoryErrors[repository.name.toString()] = 'No se pudieron cargar los proyectos.';
        TREE_DATA.push(repositoryNode);
        this.dataSource.data = TREE_DATA;
        completed++;
        if (completed === repositories.length) this.isRepositoriesLoading = false;
      }});
    });
  }, error: () => {
    this.isRepositoriesLoading = false;
    this.repositoriesError = 'No se pudieron cargar los repositorios.';
  }});
}

  deleteIdUserSave(){
    this.userService.deleteUserSave()
  }

}
