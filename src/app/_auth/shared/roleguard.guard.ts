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
      alert('Accès refusé : Cette page est réservée aux personnes autorisées uniquement.');
      this.auth.onlogout();
      this.router.navigate(['/login']);
    }
    return isAdmin;
  }


}


