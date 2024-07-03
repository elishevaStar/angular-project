import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public _loginService: LoginService, private _router: Router) {}

  login() {
    this._loginService.setIsLogin(true);
    this._router.navigate(['/setting']);
  }

  logout() {
    this._loginService.logout();
    this._router.navigate(['/home']);
  }
}
