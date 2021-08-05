import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

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
