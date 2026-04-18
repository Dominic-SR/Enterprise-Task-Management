import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from './_services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
  userData = null;
  isAuth = false;
  constructor(private auth:Auth, private router:Router){}

   ngOnInit(): void{
    this.auth.canAuthenticate(); 
    this.userData = this.auth.userDataAccess();
    this.isAuth = this.auth.isAuthenticated();
    
    
  }

  navRoutes(path:String){
    this.router.navigate([path]);
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(["login"]);
  }
} 