import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthService} from "../../user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleguardGuard implements CanActivate {
  constructor(private auth : UserAuthService, private router : Router) {
  }

  canActivate(): boolean {
    const isAdmin = this.auth.isAdmin();
    if (!isAdmin) {
      alert('Access Denied: This page is reserved for authorized persons only.\n' +
        '\n');
      this.auth.onlogout();
      this.router.navigate(['/login']);
    }
    return isAdmin;
  }


}


