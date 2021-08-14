import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { FunctionalModule } from '../functional/functional.module';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FunctionalModule,
    AuthModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
