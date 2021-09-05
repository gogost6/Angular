import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { IUser } from '../shared/interfaces/register';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<IUser>;

  get isLogged(): boolean {
    return localStorage.getItem('user') !== null ? true : false;
  }

  get userData(): any | null {
    return localStorage.getItem('user');
  }

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<IUser>(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): IUser {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<IUser>(`/api/user/login`, { username, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    this.http.get<any>(`/api/user/logout`).subscribe();
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/user/login']);
  }

  register(userData: IUser) {
    return this.http.post(`/api/user/register`, userData).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      })
    );
  }

  edit(id: string, userData: IUser, curUsername: string, curTelephone: number) {
    return this.http
      .post(`/api/user/edit`, { id, ...userData, curUsername, curTelephone })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        })
      );
  }

  isFreeUsername(username: string) {
    return this.http.get(`/api/user/free-username/${username}`);
  }

  isFreeEmail(email: string) {
    return this.http.get(`/api/user/free-email/${email}`);
  }
}
