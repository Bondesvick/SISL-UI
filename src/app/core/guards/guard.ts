import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

  async canActivate(next: ActivatedRouteSnapshot): Promise<boolean> {
    const token = localStorage.getItem('authorization');

    // Remove for UAT and production
    //return true;

    if (token != null) {
      if (!this.jwtHelper.isTokenExpired(token)) {

        if (next.paramMap.has('moduleLink')) {
          const modules =
            JSON.parse(localStorage.getItem('sislModules')) || [];
          if (
            !modules
              .map((module) => module.link)
              .includes(next.paramMap.get('moduleLink'))
          ) {
            return false;
          }
        }

        return true;
      }
    }


    // if (token != null) {
    //   if (!this.jwtHelper.isTokenExpired(token)) {

    //     const quickServiceModules =
    //       JSON.parse(localStorage.getItem('sislModules')) || [];

    //     // pass if is reports module
    //     if (next.url.find(url => url.path.toLowerCase().includes('report'))
    //       &&
    //       quickServiceModules
    //         .map((module) => module.link)
    //         .includes("reports")) { return true }

    //     if (next.paramMap.has('moduleLink')) {
    //       const quickServiceModules =
    //         JSON.parse(localStorage.getItem('quickServiceModules')) || [];
    //       if (
    //         !quickServiceModules
    //           .map((module) => module.link)
    //           .includes(next.paramMap.get('moduleLink'))
    //       ) {
    //         return false;
    //       }
    //     }

    //     // confirm token again db
    //     return true;
    //   }
    // }

    console.log('pppp');

    await this.router.navigate(['/access-denied']);
    return false;
  }

  canActivateChild(next: ActivatedRouteSnapshot): Promise<boolean> {
    return this.canActivate(next);
  }
}
