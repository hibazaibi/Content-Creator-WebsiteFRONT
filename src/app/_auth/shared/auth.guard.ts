import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthService} from "../../user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth : UserAuthService, private router : Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isLoggedIn2()) {
      return true; // User is logged in, allow access
    } else {
      // User is not logged in, store the attempted URL
      alert('You must log in!');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false; // Prevent access to the route
    }
  }


}
