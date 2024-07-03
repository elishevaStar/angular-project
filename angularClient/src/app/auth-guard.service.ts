import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private _loginService: LoginService, private _router: Router) { }

  canActivate():boolean{
    if (this._loginService.getIsLogin()) {
      return true;
    } 
    else {
      const login = confirm('It is not possible to access the settings without identification. Do you want to identify yourself?');
      if(login){
        this._router.navigate(['/login'])
      }
      else{
        this._router.navigate(['/home'])
      }
      return false;
    }
  }
}
