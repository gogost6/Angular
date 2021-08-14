import { Component, OnInit } from '@angular/core';

import { ICar } from '../../shared/interfaces/car';

import { SharedService } from '../../services/shared.service'
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  searchCars: ICar[] | undefined;

  constructor(private sharedService: SharedService, public searchService: SearchService) {
    this.searchService.search(JSON.parse(localStorage.getItem('carData') || "{}")).subscribe(carsArr => {
      this.sharedService.changeMessage(carsArr);
    });
  }

  ngOnInit() {
    this.searchCars = undefined;
    this.sharedService.currentMessage.subscribe(message => this.searchCars = message);
  }
}
