import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ICar } from '../shared/interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  delete(id: string): Observable<any> {
    return this.http.get<any>(`/api/auto/delete/${id}`);
  }

  post(body: any): Observable<any> {
    return this.http.post<any>(`/api/auto/post-car`, body);
  }

  edit(id: string | null, body: ICar): Observable<any> {
    return this.http.post<any>(`/api/auto/edit/${id}`, body);
  }
}
