import { Component } from '@angular/core';

import { UserService } from '../../services/user.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.sass']
})
export class MyCarsComponent {
  cars: any = [];

  constructor(private searchService: SearchService, private userService: UserService) {
    searchService.created(JSON.parse(userService.userData).createdAutos).subscribe(carsArr => this.cars = carsArr);
  }
}
