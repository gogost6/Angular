import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './core/about/about.component';
import { FormComponent } from './functional/form/form.component';
import { NewsComponent } from './functional/news/news.component';
import { PostCarComponent } from './functional/post-car/post-car.component';
import { SearchComponent } from './functional/search/search.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: FormComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'post-car',
    component: PostCarComponent
  },
  {
    path: 'auth/logout',
    pathMatch: 'full',
    redirectTo: '/home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
