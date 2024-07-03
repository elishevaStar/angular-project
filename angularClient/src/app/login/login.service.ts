import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  isLogin:boolean=false;

  constructor() { }

  setIsLogin(isLogin:boolean):void{
    this.isLogin=isLogin;
  }

  getIsLogin():boolean{
     return this.isLogin
  }

  logout():void{
     this.isLogin=false;
  }
  
}
