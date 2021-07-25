import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountry } from './shared/interfaces/country';

@Injectable()
export class CountriesService {
  countries: any = [];

  constructor(private httpClient: HttpClient) { }
  loadCountries() {
    this.httpClient.get("assets/countries.json").subscribe(data => {
      this.countries = data;
      console.log(this.countries.Albania.towns)
    })
  }
}
