import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/media';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) { }

  addFile(formData: FormData) {
    return this.http.post<string>(base_url + '/addFile', formData, { withCredentials: true });
  }
}
