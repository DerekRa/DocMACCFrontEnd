import { Component, OnInit } from '@angular/core';
import {
  cibFlipboard,
  cilAccountLogout,
  cilClipboard,
  cilFolderOpen,
  cilGroup,
  cilHome,
  cilList,
  cilMoney,
  cilShieldAlt,
  cilChevronBottom,
  cilCaretBottom,
} from '@coreui/icons';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { User } from 'src/app/model/class/authenticate/user.model';
// import { LoginUser } from 'src/app/model/class/authenticate/login-user';
// import { IconDirective } from '@coreui/icons-angular';
// import { KeycloakService } from 'src/app/service/keycloak.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user = new User();
  public isCollapsed: boolean = true;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public userRoles: string[] = [];
  icons = {
    cilList,
    cilFolderOpen,
    cilGroup,
    cilHome,
    cilMoney,
    cilAccountLogout,
    cilChevronBottom,
    cilCaretBottom,
  };

  constructor(private readonly keycloak: KeycloakService) {}

  public async ngOnInit() {
    const links = document.querySelectorAll('.nav-active-link');
    console.log(links.length);
    if (links.length) {
      links.forEach((link) => {
        link.addEventListener('click', (e) => {
          links.forEach((link) => {
            link.classList.remove('active');
          });
          e.preventDefault();
          link.classList.add('active');
        });
      });
    }

    this.isLoggedIn = await this.keycloak.isLoggedIn();
    // console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.user.authStatus = 'AUTH';
      this.user.name = this.userProfile.firstName || '';
      this.user.id = this.userProfile.id || '';
      window.sessionStorage.setItem('userdetails', JSON.stringify(this.user));
      console.log('user :::' + JSON.stringify(this.user));
      console.log('userProfile :::' + JSON.stringify(this.userProfile));
      // console.log('getToken :::' + this.keycloak.getToken());
      // console.log(
      //   'getUserRoles :::' +
      //     JSON.stringify(this.keycloak.getUserRoles().includes('TEST'))
      // );
      this.userRoles = this.keycloak.getUserRoles();
      // console.log(this.userRoles);
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    let redirectURI: string = 'http://localhost:4200/home';
    this.keycloak.logout(redirectURI);
  }

  // logout(): void {
  //     console.log('logout was click!....');
  //     this.keycloakService.logout();
  // }
}
