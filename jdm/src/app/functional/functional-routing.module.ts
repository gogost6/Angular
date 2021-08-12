import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { DetailsComponent } from '../functional/details/details.component';
import { EditComponent } from '../functional/edit/edit.component';
import { PostCarComponent } from '../functional/post-car/post-car.component';
import { SearchComponent } from '../functional/search/search.component';
import { EditGuard } from './edit/edit.guard';


const routes: Routes = [
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'post-car',
        canActivate: [AuthGuard],
        component: PostCarComponent
    },
    {
        path: 'search-car',
        component: SearchComponent
    },
    {
        path: 'details/:id',
        component: DetailsComponent
    },
    {
        path: 'edit/:id',
        canActivate: [EditGuard],
        component: EditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FunctionalRoutingModule { }