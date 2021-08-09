import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  cars!: any;

  constructor(private searchService: SearchService, private userService: UserService) {
    searchService.created(JSON.parse(userService.userData).created).subscribe(carsArr => this.cars = carsArr);
   }

  ngOnInit(): void {
  }

}
