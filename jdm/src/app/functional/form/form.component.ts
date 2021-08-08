import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as data from '../../../assets/data.json';
import * as cars from '../../../assets/cars.json';
import * as countries from '../../../assets/countries.json';

import { IData } from '../../shared/interfaces/data';
import { ICars } from '../../shared/interfaces/cars';
import { ICountries } from '../../shared/interfaces/countries';
import { SearchService } from '../../services/search.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})


export class FormComponent {
  jsonData: IData = data;
  cars: ICars = cars;
  countries: ICountries = countries;
  carMake: string = "";
  city: string = "";
  searchCars: any;
  message: any;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private sharedService: SharedService
    ) { }

  searchHandler(form: NgForm): void {
    if (form.invalid) { throw new Error('Invalid form!'); }
    this.searchService.search(form.value).subscribe(carsArr => {
      this.message = carsArr;
      this.sharedService.changeMessage(carsArr);
    });
    this.router.navigate(['/search-car']);
  }

}
