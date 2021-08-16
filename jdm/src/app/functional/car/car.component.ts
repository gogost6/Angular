import { Component, Input, OnInit } from '@angular/core';

import { ICar } from '../../shared/interfaces/car';

import { SharedService } from '../../services/shared.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.sass']
})
export class CarComponent {
  cars: Observable<ICar[]>;

  constructor(private sharedService: SharedService) {
    this.cars = this.sharedService.currentMessage
  }

  // likeBtnHandler() {

  // }
}
