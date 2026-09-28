import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Repository} from "../model/repository";
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/repository';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  constructor(private http: HttpClient) { }

  getRepositoriesUser(id: number) {
    return this.http.get<Repository[]>(base_url + `/repositoryByUser/${id}`, { withCredentials: true });
  }

  getRepositoryById(id: number) {
    return this.http.get<Repository>(base_url + `/repositoryById/${id}`, { withCredentials: true });
  }

  andRepository(repository: Repository) {
    return this.http.post<boolean>(base_url + '/addRepository', repository, { withCredentials: true });
  }

  update(repository: Repository) {
    return this.http.put<boolean>(base_url + '/updateRepository', repository, { withCredentials: true });
  }

  delete(id: number) {
    return this.http.delete<any>(base_url + `/deleteRepository/${id}`, { withCredentials: true });
  }

  saveDateImport(id: number, name: string, numProjects: number) {
    localStorage.setItem('idRepository', id.toString())
    localStorage.setItem('nameRepository', name)
    localStorage.setItem('numProjects', numProjects.toString())
  }

  getIdSave(): string {
    return localStorage.getItem('idRepository')!;
  }

  getNameSave(): string {
    return localStorage.getItem('nameRepository')!;
  }

  getNumProjectsSave(): string {
    return localStorage.getItem('numProjects')!;
  }

  deleteDateSave() {
    localStorage.removeItem('idRepository');
    localStorage.removeItem('nameRepository');
    localStorage.removeItem('numProjects');
  }

  getRepositoryUserCompany(idUser: number) {
    return this.http.get<Repository[]>(base_url + `/repositoryByUserCompany/${idUser}`, { withCredentials: true });
  }
}
