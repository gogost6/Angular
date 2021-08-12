import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as data from '../../../assets/data.json';
import * as cars from '../../../assets/cars.json';
import * as countries from '../../../assets/countries.json';

import { IData } from '../../shared/interfaces/data';
import { ICars } from '../../shared/interfaces/cars';
import { ICar } from '../../shared/interfaces/car';
import { ICountries } from '../../shared/interfaces/countries';

import { CarService } from '../../services/car.service';
import { SearchService } from '../../services/search.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  car!: ICar;
  id = this._Activatedroute.snapshot.paramMap.get("id");
  jsonData: IData = data;
  cars: ICars = cars;
  countries: ICountries = countries;
  carMake: string = "";
  city: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private carService: CarService,
    private searchService: SearchService,
    private sharedService: SharedService
  ) {
    this.searchService.details(this.id).subscribe(carDetails => this.sharedService.changeDetailsMessage(carDetails));
  }

  editHandler(form: NgForm) {
    this.carService.edit(this.id, form.value).subscribe();
    this.router.navigate(['/details', this.id]);
  }

  ngOnInit() {
    this.sharedService.currentDetailsMessage.subscribe(message => {
      this.car = message;
      this.carMake = message.make;
      this.city = message.country;
    });
  }
}
