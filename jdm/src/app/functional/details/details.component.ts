import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ICar } from '../../shared/interfaces/car';

import { CarService } from '../../services/car.service';
import { SearchService } from '../../services/search.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  car!: ICar;
  id = this._Activatedroute.snapshot.paramMap.get("id");
  isOwner: boolean = false;

  get userData() {
    return JSON.parse(this.userService.userData) !== null ? JSON.parse(this.userService.userData) : undefined;
  }

  constructor(
    private searchService: SearchService,
    private _Activatedroute: ActivatedRoute,
    private userService: UserService,
    private carService: CarService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.searchService.details(this.id).subscribe(carDetails => {
      this.sharedService.changeDetailsMessage(carDetails);
      if (this.userData) {
        this.isOwner = this.userData._id == this.car.owner._id ? true : false;
      }
    }
    );
  }

  deleteCar(id: string) {
    this.carService.delete(id).subscribe((response) => {
      if (response) {
        console.log('DELETED');
      }
    });
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.sharedService.currentDetailsMessage.subscribe(message => this.car = message);
  }
}