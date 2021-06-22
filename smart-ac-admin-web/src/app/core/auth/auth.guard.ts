/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  loginPath = "login";
  homePath = "dashboard";

  canActivate(
    route: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getState().pipe(
      map((state) => {
        //if not logged but goes to not login page - redirect to login page
        if (!state.isLoggedIn && route.routeConfig.path !== this.loginPath) {
          void this.router.navigate([this.loginPath], {
            queryParams: { returnUrl: routerStateSnapshot.url },
          });
          return false;
        }

        //if logged but goes to login page - redirect to home
        if (state.isLoggedIn && route.routeConfig.path === this.loginPath) {
          void this.router.navigate([this.authService.getHomePathByRole()]);
          return false;
        }

        if (
          state.isLoggedIn &&
          route.routeConfig.path == this.homePath &&
          this.homePath != this.authService.getHomePathByRole()
        ) {
          void this.router.navigate([this.authService.getHomePathByRole()]);
          return false;
        }

        // authorized so return true
        return true;
      })
    );
  }
}
