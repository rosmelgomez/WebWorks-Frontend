import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Auth } from '../model/Auth';
import { Session } from '../model/session';
import {Url} from "../model/url";

const base_url = Url.urlBackend;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // el backend guarda el jwt en cookies httpOnly; luego se consulta /me para obtener usuario y rol
  login(user: Auth) {
    this.clearSession();
    return this.http.post(base_url + '/login', user, { withCredentials: true, responseType: 'text' }).pipe(
      switchMap(() => this.http.get<Session>(base_url + '/me', { withCredentials: true })),
      tap(session => {
        localStorage.setItem('session', JSON.stringify(session));
      }));
  }

  // valida el api_token (cookie) contra el backend
  apiToken() {
    return this.http.get(base_url + '/api-token', { withCredentials: true, responseType: 'text' });
  }

  getSession(): Session | null {
    const raw = localStorage.getItem('session');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Session;
    } catch {
      return null;
    }
  }

  getRole(): string | null {
    return this.getSession()?.rol ?? null;
  }

  getUser(): string | null {
    return this.getSession()?.username ?? null;
  }

  logout() {
    // el backend elimina las cookies; el cliente queda deslogueado aunque falle
    this.http.post(base_url + '/logout-user', {}, { withCredentials: true, responseType: 'text' }).subscribe({ error: () => {} });
    this.clearSession();
  }

  clearSession() {
    localStorage.removeItem('session');
    localStorage.removeItem('password');
  }

  isLoggedIn(): boolean {
    return !!this.getSession();
  }
}
