import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from '../model/plan';
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  constructor(private http: HttpClient) { }

  getPlanes() {
    return this.http.get<Plan[]>(base_url + '/getPlanes', { withCredentials: true });
  }

  saveIdPlan(id: number) {
    localStorage.setItem('idPlan', id.toString());
  }

  savePricePlan(price: number) {
    localStorage.setItem('pricePlan', price.toString());
  }

  getIdPlan() {
    return localStorage.getItem('idPlan')!
  }

  getPricePlan() {
    return localStorage.getItem('pricePlan')!
  }

  deleteData() {
    localStorage.removeItem('idPlan');
    localStorage.removeItem('pricePlan');
  }
}
