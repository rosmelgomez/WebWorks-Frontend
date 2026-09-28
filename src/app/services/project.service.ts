import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  getProjectRepository(id: number) {
    return this.http.get<Project[]>(base_url + `/projectsRepository/${id}`, { withCredentials: true });
  }

  projectById(id: number) {
    return this.http.get<Project>(base_url + `/projectById/${id}`, { withCredentials: true });
  }

  addProject(project: Project) {
    return this.http.post<Boolean>(base_url + '/addProject', project, { withCredentials: true });
  }

  update(project: Project) {
    return this.http.put<Boolean>(base_url + '/updateProject', project, { withCredentials: true });
  }

  delete(id: number) {
    return this.http.delete<Boolean>(base_url + `/deleteProject/${id}`, { withCredentials: true });
  }

  saveId(id: number) {
    localStorage.setItem('idProject', id.toString())
  }

  getIdUpdate(): string {
    return localStorage.getItem('idProject')!;
  }

  deleteIdSave() {
    localStorage.removeItem('idProject');
  }

  // Company: el backend usa el mismo endpoint para ambos roles
  getProjectsRepositoryCompany(idRepository: number) {
    return this.getProjectRepository(idRepository);
  }
}
