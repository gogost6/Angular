import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) { }

  loginHandler(form: NgForm): void {
    if (form.invalid) { throw new Error('Invalid form!'); }
    console.log(form.value);
    const {username, password} = form.value;
    this.userService.login(username, password);
    this.router.navigateByUrl('/');
  }
}
