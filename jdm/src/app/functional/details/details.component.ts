import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent {
  car: any;
  id = this._Activatedroute.snapshot.paramMap.get("id");
  isOwner: boolean = false;

  get userData() {
    return JSON.parse(this.userService.userData);
  }

  constructor(
    private searchService: SearchService,
    private _Activatedroute: ActivatedRoute,
    private userService: UserService
  ) {
    this.searchService.details(this.id).subscribe((response) => {
      if (response) {
        this.car = response;
        console.log(this.car.owner);
        
        this.isOwner = this.userData._id == this.car.owner ? true : false;
      }
    }
    );
  }
}
