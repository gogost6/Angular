import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICar } from '../../shared/interfaces/car';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.sass']
})
export class RecentComponent {
  recentCars$: Observable<ICar[]>;
  
  constructor(private searchService: SearchService, private router: Router) { 
    this.recentCars$ = this.searchService.recent();
  }

  showDetails(carId: any) {
    try {
      const url: any = `/details/${carId}`;
      this.router.navigate([url]);
    } catch(err) {
      console.log(err);
      this.router.navigate(['/home']);
    }
  }
}
