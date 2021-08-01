import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces/register';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<IUser>

  get isLogged(): boolean {
    return localStorage.getItem('user') !== null ? true : false;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('user') || "{}"));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): IUser {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<IUser>(`${environment.apiUrl}/user/login`, { username, password }, { withCredentials: true })
      .pipe(map(user => {
        console.log(user)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }))
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    this.http.get<any>(`${environment.apiUrl}/user/logout`)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  register(userData: IUser) {
    return this.http.post(`${environment.apiUrl}/user/register`, userData, { withCredentials: true })
      .pipe(
        map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }))
      .subscribe(
        (response) => {
          console.log(response)
          this.router.navigate(['/home']);
        },
        (error) => console.log(error)
      );
  }
}
