import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    console.log('AuthGuard');
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.loginService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
