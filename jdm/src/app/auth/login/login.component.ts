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
  loginError: string | undefined;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  loginHandler(form: NgForm): void {
    if (form.invalid) { throw new Error('Invalid form!'); }
    const { username, password } = form.value;
    this.userService.login(username, password).subscribe(
      (response) => {
        this.router.navigate(['/']);
      },
      (error) => {
        this.loginError = error.error.msg;
      }
    );;
  }
}
