import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxDropzoneModule } from 'ngx-dropzone'; 
import { NgImageSliderModule } from 'ng-image-slider';

import { FormComponent } from './form/form.component';
import { RecentComponent } from './recent/recent.component';
import { SearchComponent } from './search/search.component';
import { PostCarComponent } from './post-car/post-car.component';
import { CarComponent } from './car/car.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { FunctionalRoutingModule } from './functional-routing.module';


@NgModule({
  declarations: [
    FormComponent,
    RecentComponent,
    SearchComponent,
    PostCarComponent,
    CarComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FunctionalRoutingModule,
    NgxDropzoneModule,
    NgImageSliderModule
  ]
})
export class FunctionalModule { }
