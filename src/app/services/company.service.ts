import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Company} from "../model/company";
import {tap} from "rxjs/operators";
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) { }

  getCompany(username: string) {
    return this.http.get<Company>(base_url + `/companyByUsername/${username}`, { withCredentials: true }).pipe(
      tap(response => {
        localStorage.setItem('idCompany', response.id.toString());
      }));
  }

  AddCompany(company: Company) {
    return this.http.post<Company>(Url.urlBackend + '/registerCompany', company, { withCredentials: true });
  }

  updateCompany(company: Company) {
    return this.http.put<boolean>(base_url + '/updateCompany', company, { withCredentials: true });
  }

  getIdCompany(): string {
    return localStorage.getItem('idCompany')!;
  }

  deleteIdCompany() {
    localStorage.removeItem('idCompany');
  }
}
