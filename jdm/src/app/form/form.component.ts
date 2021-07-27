import { Component, Input, OnInit, Output } from '@angular/core';
import { ICars } from '../shared/interfaces/cars';
import { CountriesService } from '../countries.service';
import { HttpClient } from '@angular/common/http';
import * as carsData from '../../assets/cars.json'
// import * as data from '../countries.json';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit{
  makeSelect: HTMLInputElement | undefined;
  thisCar: string | undefined;
  towns: HTMLElement | undefined;
  countrySelect!: string;
  carsData = carsData;

  constructor(private httpClient: HttpClient) {
    
  }
  ngOnInit(): void {
    console.log(this.makeSelect?.value);
  }

  onSubmit(f: Object): void {
    console.log(f)
  }
}
