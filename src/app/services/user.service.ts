import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import {tap} from "rxjs/operators";
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  registrar(user: User) {
    return this.http.post<User>(Url.urlBackend + '/registerUser', user, { withCredentials: true });
  }

  getUser(username: string) {
    return this.http.get<User>(base_url + `/userByUsername/${username}`, { withCredentials: true }).pipe(
      tap(response => {
        localStorage.setItem('idUser', response.id.toString());
        localStorage.setItem('name', response.name.toString())
      }));
  }

  updateUser(user: User) {
    return this.http.put<boolean>(base_url + '/updateUser', user, { withCredentials: true });
  }

  getId(): string {
    return localStorage.getItem('idUser')!;
  }

  getName(): string {
    return localStorage.getItem('name')!;
  }

  deleteDateSave() {
    localStorage.removeItem('idUser');
    localStorage.removeItem('name');
  }

  gerAllUsers() {
    return this.http.get<User[]>(base_url + '/getAllUsers', { withCredentials: true });
  }

  // Company
  saveUserId(idUser: number) {
    localStorage.setItem("idUserSave", idUser.toString());
  }

  getSaveUserId(): string {
    return localStorage.getItem("idUserSave")!;
  }

  deleteUserSave() {
    localStorage.removeItem("idUserSave");
  }

  getUserById(idUser: number) {
    return this.http.get<User>(base_url + `/userById/${idUser}`, { withCredentials: true });
  }
}
