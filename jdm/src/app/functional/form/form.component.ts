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

  constructor(
    private searchService: SearchService,
    private router: Router
    ) { }

  searchHandler(form: NgForm): void {
    if (form.invalid) { throw new Error('Invalid form!'); }
    localStorage.setItem('carData', JSON.stringify(form.value));
    this.router.navigate(['/api/search-car']);
  }

}
