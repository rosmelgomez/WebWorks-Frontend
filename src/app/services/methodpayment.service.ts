import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MethodPayment } from '../model/methodPayment';
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/methodpayment';

@Injectable({
  providedIn: 'root'
})
export class MethodpaymentService {
  constructor(private http: HttpClient) { }

  methodsPaymentByUser(id: number) {
    return this.http.get<MethodPayment[]>(base_url + `/methodsPaymentByUser/${id}`, { withCredentials: true });
  }

  addMethodPayment(methodPayment: MethodPayment) {
    return this.http.post<Boolean>(base_url + '/addMethodPayment', methodPayment, { withCredentials: true });
  }

  getMethodPaymentById(id: number) {
    return this.http.get<MethodPayment>(base_url + `/methodPaymentById/${id}`, { withCredentials: true });
  }

  saveId(id: number) {
    localStorage.setItem('idCard', id.toString());
  }

  getIdCardSave() {
    return localStorage.getItem('idCard')!
  }

  deleteIdSave() {
    localStorage.removeItem('idCard');
  }

  delete(id: number) {
    return this.http.delete<Boolean>(base_url + `/deleteMethodPaymentById/${id}`, { withCredentials: true });
  }

  update(methodPayment: MethodPayment) {
    return this.http.put<boolean>(base_url + '/updateMethodPayment', methodPayment, { withCredentials: true });
  }
}
