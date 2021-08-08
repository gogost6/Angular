import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(private userService: UserService) { }

  loginHandler(form: NgForm): void {
    if (form.invalid) { throw new Error('Invalid form!'); }
    const { username, password } = form.value;
    this.userService.login(username, password);
  }
}
