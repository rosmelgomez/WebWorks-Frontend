import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from '../model/subscription';
import {SubscriptionSummary} from "../modelComplement/subscriptionSummary";
import {tap} from "rxjs/operators";
import {Url} from "../model/url";
import {SubscriptionCheck} from "../modelComplement/subscriptioCheck";

const base_url = Url.urlBackend + '/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private http: HttpClient) { }

  checkSubscription(id: number) {
    return this.http.get<SubscriptionCheck>(base_url + `/subscriptionActive/${id}`, { withCredentials: true }).pipe(
      tap(response => {
        // status true = suscripcion de pago activa (antes se guardaba "[object Object]")
        localStorage.setItem('check', String(response.status));
      }));
  }

  getCheckSubscription(): Boolean {
    return localStorage.getItem('check') === 'true';
  }

  addSubscription(subscription: Subscription) {
    return this.http.post<boolean>(base_url + '/addSubscription', subscription, { withCredentials: true });
  }

  getSubscriptions(idUser: number) {
    return this.http.get<SubscriptionSummary[]>(base_url + `/listSubscriptionsByUser/${idUser}`, { withCredentials: true });
  }

  freMaxNumberRepositories() {
    return 3;
  }

  freeMaxNumberProjects() {
    return 2;
  }
}
