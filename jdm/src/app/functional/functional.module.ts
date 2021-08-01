import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { RecentComponent } from './recent/recent.component';
import { SearchComponent } from './search/search.component';
import { ForumComponent } from './forum/forum.component';
import { FormsModule } from '@angular/forms';
import { PostCarComponent } from './post-car/post-car.component';



@NgModule({
  declarations: [
    FormComponent,
    RecentComponent,
    SearchComponent,
    ForumComponent,
    PostCarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class FunctionalModule { }
