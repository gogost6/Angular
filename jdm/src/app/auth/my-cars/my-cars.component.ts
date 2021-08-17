import { Component } from '@angular/core';

import { UserService } from '../../services/user.service';
import { SearchService } from '../../services/search.service';
import { Observable } from 'rxjs';
import { ICar } from 'src/app/shared/interfaces/car';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.sass']
})
export class MyCarsComponent {
  cars$: Observable<ICar[]>;

  constructor(private searchService: SearchService, private userService: UserService) {
    this.cars$ = searchService.created(JSON.parse(userService.userData).createdAutos);
  }
}
