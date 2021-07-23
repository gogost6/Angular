import { Component, OnInit } from '@angular/core';
import { ICountry } from '../shared/interfaces/country';
import {CountriesService} from '../countries.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent{
  towns: Object | undefined;

  // constructor(private CountriesService: CountriesService) {
  //   this.fetchRecentPosts();
  // }

  // fetchRecentPosts(): void {
  //   this.countries = undefined;
  //   this.CountriesService.loadCountries().subscribe(countries => this.countries = countries);
  // }
}
