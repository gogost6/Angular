import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as data from '../../../assets/data.json';
import * as cars from '../../../assets/cars.json';
import * as countries from '../../../assets/countries.json';

import { IData } from '../../shared/interfaces/data';
import { ICars } from 'src/app/shared/interfaces/cars';
import { ICountries } from 'src/app/shared/interfaces/countries';
import { SearchService } from '../../services/search.service'
import { SharedService } from '../../services/shared.service'
import { ICar } from 'src/app/shared/interfaces/car';

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

  constructor(
    private searchService: SearchService,
    private router: Router,
    private sharedService: SharedService
    ) { }

  searchHandler(form: NgForm): void {
    if (form.invalid) { throw new Error('Invalid form!'); }
    this.searchService.search(form.value).subscribe(carsArr => {
      this.searchCars = carsArr;
      this.sharedService.setData(this.searchCars);
    });
    this.router.navigate(['/search-car']);
  }
}
