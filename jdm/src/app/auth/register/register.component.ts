import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  registerErrors: string | undefined;

  constructor(private userService: UserService, private router: Router) { }

  registerHandler(form: NgForm): void {
    if (form.invalid) { 
      this.registerErrors = 'Please fill all fields!';
      throw new Error('Invalid form!'); 
    }
    this.userService.register(form.value).subscribe(
      (response) => {
        this.router.navigate(['/home']);
      },
      (error) => this.registerErrors = error.error.msg
    );;
  }
}
