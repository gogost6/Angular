import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICar } from '../shared/interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  delete(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/auto/delete/${id}`, { withCredentials: true });
  }

  post(body: any):Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auto/post-car`, body, { withCredentials: true })
  }
}
