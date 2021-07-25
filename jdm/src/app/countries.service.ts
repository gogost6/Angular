import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountry } from './shared/interfaces/country';

@Injectable()
export class CountriesService {

  constructor(private http: HttpClient) { }

  loadCountries() {
    return this.http.get<ICountry[]>(`https://restcountries.eu/rest/v2/name/united`);
  }
}
