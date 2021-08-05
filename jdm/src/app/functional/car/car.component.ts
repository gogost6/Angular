import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ICar } from 'src/app/shared/interfaces/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.sass']
})
export class CarComponent{

  get searchCars() {
    return this.sharedService.getData
  }

  constructor(private sharedService: SharedService) {
   }

}
