import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAdmin = this.authService.getIsAuth().role;
      console.log('****** isAuth guard 123 ', isAdmin);
      if (isAdmin && isAdmin == "1") {
        return true;
      } else {
        this.router.navigate(['/dashboard']);
        return false;
      }
  }
  
}
