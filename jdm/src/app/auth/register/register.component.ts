import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, Observable, throwError } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements AfterViewInit {
  invalidFormError: string | undefined;
  registerErrors: string[] = [];
  usedUsernameError: string | undefined;
  @ViewChild('usernameHtml') usernameHtml!: ElementRef<HTMLInputElement>;
  usedEmailError: string | undefined;
  @ViewChild('emailHtml') emailHtml!: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService, private router: Router) {}

  ngAfterViewInit(): void {
    fromEvent(this.usernameHtml.nativeElement, 'input')
      .pipe(
        map((e) => (e.target as HTMLInputElement).value),
        debounceTime(1000),
        distinctUntilChanged(),
        filter((x) => x !== '')
      )
      .subscribe((value) =>
        this.userService.isFreeUsername(value).subscribe((b) => {
          this.usedUsernameError = undefined;
          if (b == true) {
            this.usedUsernameError = 'Username is already registered!';
          }
        })
      );

    fromEvent(this.emailHtml.nativeElement, 'input')
      .pipe(
        map((e) => (e.target as HTMLInputElement).value),
        debounceTime(2000),
        distinctUntilChanged(),
        filter((x) => x !== '')
      )
      .subscribe((value) =>
        this.userService.isFreeEmail(value).subscribe((b) => {
          this.usedEmailError = undefined;
          if (b == true) {
            this.usedEmailError = 'Email is already registered!';
          }
        })
      );
  }

  registerHandler(form: NgForm): void {
    if (this.usedUsernameError == 'Username is already registered!') {
      throw new Error('Invalid form!');
    }

    if (this.usedEmailError == 'Email is already registered!') {
      throw new Error('Invalid form!');
    }

    if (form.invalid) {
      this.invalidFormError = 'Please fill all fields!';
      throw new Error('Invalid form!');
    }
    this.userService.register(form.value).subscribe(
      (response) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
        this.registerErrors.push(error.error.msg);
      }
    );
  }
}
