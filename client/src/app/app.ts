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
  userData = null
  constructor(private auth:Auth, private router:Router){}

   ngOnInit(): void{
     this.userData = this.auth.userDataAccess();
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
