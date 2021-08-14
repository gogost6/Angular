import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { IUser } from '../../shared/interfaces/register';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = route.params.id;

    if (this.userService.userData == null) {
      return this.router.createUrlTree(['/home']);
    }

    const user: IUser = JSON.parse(this.userService.userData);
    
    if (user.createdAutos.includes(id) && user !== null) {
      return true;
    } else {
      return this.router.createUrlTree(['/home']);
    }
  }

}
