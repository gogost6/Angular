import { Component } from '@angular/core';

import { UserService } from '../../services/user.service';
import { SearchService } from '../../services/search.service';
import { Observable } from 'rxjs';
import { ICar } from 'src/app/shared/interfaces/car';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.sass'],
})
export class MyCarsComponent {
  isLoading: boolean = true;
  cars$!: ICar[];

  constructor(
    private searchService: SearchService,
    private userService: UserService
  ) {
    searchService
      .created(JSON.parse(userService.userData).createdAutos)
      .subscribe((cars) => {
        this.cars$ = cars;
        this.isLoading = false;
      });
  }
}
