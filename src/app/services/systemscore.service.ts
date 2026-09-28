import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SystemScore} from "../model/systemScore";
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/systemScore';

@Injectable({
  providedIn: 'root'
})
export class SystemScoreService {
  constructor(private http: HttpClient) { }

  addScore(systemScore: SystemScore) {
    return this.http.post<Boolean>(base_url + '/addScore', systemScore, { withCredentials: true });
  }
}
