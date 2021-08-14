import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private userService: UserService) { }

  editHandler(form: NgForm): void {
    if (form.invalid) { throw new Error('Invalid form!'); }
    this.userService.edit(this.userData._id, form.value, this.userData.username, this.userData.telephone);
  }
}
