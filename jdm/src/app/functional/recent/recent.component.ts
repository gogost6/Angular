import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.sass']
})
export class RecentComponent {
  recentCars: any;
  
  constructor(private searchService: SearchService, private router: Router) { 
    this.searchService.recent().subscribe(
      car => this.recentCars = car
    );;
    console.log(this.recentCars)
  }

  showDetails(carId: any) {
    try {
      const url: any = `/details/${carId}`;
      this.router.navigate(url)
    } catch(err) {
      console.log(err);
      this.router.navigate(['/home']);
    }
  }
}
