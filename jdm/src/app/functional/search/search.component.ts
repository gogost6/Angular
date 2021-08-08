import { Component, OnInit} from '@angular/core';

import * as data from '../../../assets/data.json';
import * as cars from '../../../assets/cars.json';
import * as countries from '../../../assets/countries.json';

import { IData } from '../../shared/interfaces/data';
import { ICars } from '../../shared/interfaces/cars';
import { ICountries } from '../../shared/interfaces/countries';
import { ICar } from '../../shared/interfaces/car';

import { SharedService } from '../../services/shared.service'
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit{
  jsonData: IData = data;
  cars: ICars = cars;
  countries: ICountries = countries;
  carMake: string = "";
  city: string = "";
  searchCars!: ICar[];
  
  constructor(private sharedService: SharedService, public searchService: SearchService) {
    this.searchService.search(JSON.parse(localStorage.getItem('carData') || "{}")).subscribe(carsArr => {
      this.sharedService.changeMessage(carsArr);
    });
   }

  ngOnInit() {
    this.sharedService.currentMessage.subscribe(message => this.searchCars = message);
  }
}
