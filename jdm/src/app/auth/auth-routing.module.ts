import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { MyCarsComponent } from './my-cars/my-cars.component';
import { EditComponent } from './edit/edit.component';



const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent,
        children: [
            {
                path: 'my-cars',
                component: MyCarsComponent
            },
            {
                path: 'edit',
                component: EditComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }