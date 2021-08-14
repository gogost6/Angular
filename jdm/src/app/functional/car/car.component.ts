import { Component, Input, OnInit } from '@angular/core';

import { ICar } from '../../shared/interfaces/car';

import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.sass']
})
export class CarComponent implements OnInit {
  cars: ICar[] | undefined;

  constructor(private sharedService: SharedService) {
  }

  // likeBtnHandler() {

  // }

  ngOnInit() {
    this.cars = undefined;
    this.sharedService.currentMessage.subscribe(message => this.cars = message);
  }
}
