import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  constructor(private userService: UserService) { }

  registerHandler(form: NgForm): void {
    if (form.invalid) { throw new Error('Invalid form!'); }
    console.log(form.value);
    this.userService.register(form.value);
  }
}
