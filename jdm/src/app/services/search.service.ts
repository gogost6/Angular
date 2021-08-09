import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ICar } from '../shared/interfaces/car';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private router: Router, public sharedService: SharedService) { }

  search(data: ICar) {
    return this.http.post<ICar[]>(`${environment.apiUrl}/auto/search-cars`, data, { withCredentials: true });
  }

  details(id: string | null): Observable<ICar> {
    return this.http.get<ICar>(`${environment.apiUrl}/auto/details/${id}`, { withCredentials: true })
  }

  recent(): Observable<ICar> {
    return this.http.get<ICar>(`${environment.apiUrl}/auto/recent-cars`, { withCredentials: true });
  }

  created(data: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/auto/created`, data, { withCredentials: true })
  }
}
