import { Component} from '@angular/core';

import * as data from '../../../assets/data.json';
import * as cars from '../../../assets/cars.json';
import * as countries from '../../../assets/countries.json';

import { IData } from '../../shared/interfaces/data';
import { ICars } from '../../shared/interfaces/cars';
import { ICountries } from '../../shared/interfaces/countries';

import { SharedService } from '../../services/shared.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {
  jsonData: IData = data;
  cars: ICars = cars;
  countries: ICountries = countries;
  carMake: string = "";
  city: string = "";

  get searchCars() {
    return this.sharedService.getData;
  }

  constructor(private sharedService: SharedService) { }

}
