import { Component } from '@angular/core';
import { ICountry } from './shared/interfaces/country';
import { CountriesService } from './countries.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  countries: Object | undefined;

  // constructor(private CountriesService: CountriesService) {
  //   this.fetchRecentPosts();
  // }

  // fetchRecentPosts(): void {
  //   this.countries = undefined;
  //   this.CountriesService.loadCountries().subscribe(countries => this.countries = countries);
  // }
}
