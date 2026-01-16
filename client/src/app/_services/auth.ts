import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
 
  constructor(private router:Router) {}
  isAuthenticated():boolean{
    if(sessionStorage.getItem('token') !== null){
      return true;
    }
    return false;
  }

  canAccess(){
      if(!this.isAuthenticated()){
        // redirect to login
        this.router.navigate(["login"]);
      }
  }
}
