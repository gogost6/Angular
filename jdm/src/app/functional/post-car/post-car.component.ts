import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as data from '../../../assets/data.json';
import * as cars from '../../../assets/cars.json';
import * as countries from '../../../assets/countries.json';

import { IData } from '../../shared/interfaces/data';
import { ICars } from 'src/app/shared/interfaces/cars';
import { ICountries } from 'src/app/shared/interfaces/countries';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.sass']
})
export class PostCarComponent {
  jsonData: IData = data;
  cars: ICars = cars;
  countries: ICountries = countries;
  carMake: string = "";
  city: string = "";

  constructor(private http: HttpClient) { }

  postHandler(form: NgForm) {
    this.http.post<any>(`${environment.apiUrl}/auto/post-car`, form.value, { withCredentials: true })
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}

