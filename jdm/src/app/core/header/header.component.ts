import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  constructor(public userService: UserService) { }

  logoutHandler(): void {
    this.userService.logout();
  }

  ngOnInit(): void {
    console.log(this.isLogged);
  }
}
