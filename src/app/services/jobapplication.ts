import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {JobApplication} from "../model/jobApplication";
import {JobApplicationSummary} from "../modelComplement/jobApplicationSummary";
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/jobApplication';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  constructor(private http: HttpClient) { }

  checkJobApplication(idEmployment: number, idUser: number) {
    return this.http.get<boolean>(base_url + `/checkJobApplication/${idEmployment}/${idUser}`, { withCredentials: true });
  }

  addJobApplication(jobApplication: JobApplication) {
    return this.http.post<boolean>(base_url + '/addJobApplication', jobApplication, { withCredentials: true });
  }

  getJobApplicationStatusByCompany(idCompany: number, status: String) {
    return this.http.get<JobApplicationSummary[]>(base_url + `/getJobApplicationStatusByCompany/${idCompany}/${status}`, { withCredentials: true });
  }

  changeJobApplication(idJobApplication: number, status: String) {
    return this.http.put<Boolean>(base_url + `/changeJobApplication/${idJobApplication}/${status}`, {}, { withCredentials: true });
  }
}
