export class LoginUsers {
  public userId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public profileImageUrl: string;
  public lastLoginDate: Date;
  public lastLoginDateDisplay: Date;
  public joinDate: Date;
  public role: string;
  public authorities: [];
  public active: boolean;
  public statusCd: string;
  public statusMsg: string;
  public authStatus: string;
  public notLocked: boolean;

  constructor() {
    this.userId = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.lastLoginDate = new Date();
    this.lastLoginDateDisplay = new Date();
    this.joinDate = new Date();
    this.profileImageUrl = '';
    this.active = false;
    this.notLocked = false;
    this.role = '';
    this.authorities = [];
    this.statusCd = '';
    this.statusMsg = '';
    this.authStatus = '';
  }
}
