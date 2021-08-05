import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICar } from '../shared/interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private router: Router) { }

  search(data: ICar) {
    return this.http.post<ICar[]>(`${environment.apiUrl}/auto/search-cars`, data, { withCredentials: true })
  }

  recent(): Observable<ICar> {
    return this.http.get<ICar>(`${environment.apiUrl}/auto/recent-cars`);
  }
}
