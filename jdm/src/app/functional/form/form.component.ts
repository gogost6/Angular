import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as data from '../../../assets/data.json';
import * as cars from '../../../assets/cars.json';
import * as countries from '../../../assets/countries.json';

import { IData } from '../../shared/interfaces/data';
import { ICars } from 'src/app/shared/interfaces/cars';
import { ICountries } from 'src/app/shared/interfaces/countries';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})


export class FormComponent{
  jsonData: IData = data;
  cars: ICars = cars;
  countries: ICountries = countries;
  carMake: string = "";
  city: string = "";

  constructor() {
    
  }

  searchHandler(form: NgForm): void {
    console.log(form); 
  }
}
