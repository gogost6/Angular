import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { IUser } from '../../shared/interfaces/register';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent {
  get userData(): IUser {
    return JSON.parse(this.userService.userData) !== null ? JSON.parse(this.userService.userData) : undefined;
  }

  editErrors = [];

  constructor(private userService: UserService, private router: Router) { }

  editHandler(form: NgForm): Promise<boolean> | undefined {
    if (form.invalid) { throw new Error('Invalid form!'); }
    const { username, telephone, oldPassword, newPassword } = form.value;
    if (
      this.userData.username == username &&
      telephone == this.userData.telephone &&
      oldPassword == '' &&
      newPassword == ''
    ) {
      return this.router.navigate(['/']);
    }
    this.userService.edit(this.userData._id, form.value, this.userData.username, this.userData.telephone).subscribe(
      (response) => {
        return this.router.navigate(['/']);
      },
      (error) => {
        if(error.error.msg.length > 0) {
          this.editErrors = error.error.msg;
        }
        return;
      }
    );
    return;
  }
}
