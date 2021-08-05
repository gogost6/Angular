import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { RecentComponent } from './recent/recent.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { PostCarComponent } from './post-car/post-car.component';
import { CarComponent } from './car/car.component';
import { NgxDropzoneModule } from 'ngx-dropzone'; 
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FormComponent,
    RecentComponent,
    SearchComponent,
    PostCarComponent,
    CarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxDropzoneModule
  ]
})
export class FunctionalModule { }
