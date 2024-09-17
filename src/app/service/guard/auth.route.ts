import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
// import { LoginUser } from 'src/app/model/class/authenticate/login-user';
import { User } from 'src/app/model/class/authenticate/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthKeyClockGuard extends KeycloakAuthGuard {
  user = new User();
  public userProfile: KeycloakProfile | null = null;
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    console.log('authenticated :' + this.authenticated);
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    } else {
      this.userProfile = await this.keycloak.loadUserProfile();
      console.log(this.userProfile);
      this.user.authStatus = 'AUTH';
      this.user.name = this.userProfile.firstName || '';
      this.user.email = this.userProfile.email || '';
      window.sessionStorage.setItem('userdetails', JSON.stringify(this.user));
    }

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];
    console.log(requiredRoles);

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      console.log('here..');
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.some((role) => this.roles.includes(role));
  }
}
