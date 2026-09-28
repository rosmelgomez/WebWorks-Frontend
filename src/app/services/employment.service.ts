import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Employment} from "../model/employment";
import {Url} from "../model/url";
import {EmploymentSummary} from "../modelComplement/employmentSummary";

const base_url = Url.urlBackend + '/employment';

@Injectable({
  providedIn: 'root'
})
export class EmploymentService {
  constructor(private http: HttpClient) { }

  addEmployment(employment: Employment) {
    return this.http.post<boolean>(base_url + '/addEmployment', employment, { withCredentials: true });
  }

  getEmploymentsByCompany(id: number) {
    return this.http.get<Employment[]>(base_url + `/getEmploymentsByCompany/${id}`, { withCredentials: true });
  }

  getEmploymentById(id: number) {
    return this.http.get<Employment>(base_url + `/getEmploymentById/${id}`, { withCredentials: true });
  }

  updateEmployment(employment: Employment) {
    return this.http.put<boolean>(base_url + '/updateEmployment', employment, { withCredentials: true });
  }

  deleteEmployment(id: number) {
    return this.http.delete<boolean>(base_url + `/deleteEmployment/${id}`, { withCredentials: true });
  }

  saveIdEmployment(id: number) {
    localStorage.setItem('idEmployment', id.toString());
  }

  getIdEmployment(): string {
    return localStorage.getItem('idEmployment')!;
  }

  deleteIdEmployment() {
    localStorage.removeItem('idEmployment');
  }

  getEmployments() {
    return this.http.get<EmploymentSummary[]>(base_url + '/getEmploymentsSummary', { withCredentials: true });
  }
}
