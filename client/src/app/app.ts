import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from './_services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
  userData: any;
  constructor(private auth:Auth, private router:Router){
    this.userData = this.auth.userDataSignal;
  }

   ngOnInit(): void{
    this.auth.canAuthenticate() 
  }

  navRoutes(path:String){
    this.router.navigate([path]);
  }

  logout(){
    this.auth.setUserData(null);
    sessionStorage.removeItem('token');
    this.router.navigate(["login"]);
  }
}
