import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
 
 
  constructor(private router:Router, private http:HttpClient) {}
  isAuthenticated():boolean{
    if(sessionStorage.getItem('token') !== null){
      return true;
    }
    return false;
  }

  canAccess(){
      if(!this.isAuthenticated()){
        this.router.navigate(["login"]);
      }
  }

  userDataAccess(){
      const data = localStorage.getItem('user-data');
    if (data) {
      return JSON.parse(data); 
    }
    return null; 
  }

  canAuthenticate(){
      if(this.isAuthenticated()){
        this.router.navigate(["board"]);
      }
  }

  register(name:String,email:String,password:String){
     return this.http.post<{token:String,data:any}>('http://127.0.0.1:8000/api/user/register',
        {
        "username":name,
        "email":email,
        "password": password,
        "role": "6963e2e70e8a21e3351a9667"
        }
      )
  }

  login(email:String,password:String){
    return this.http.post<{token:String,data:any}>('http://127.0.0.1:8000/api/user/login',
       {
        "email":email,
        "password": password,
        }
    )
  }

  getAllUsers(){
    return this.http.get<{data:any}>("http://127.0.0.1:8000/api/user/")
  }

  addTask(task:String, description:String, assignto:String,status:String){
   return this.http.post<{data:any}>("http://127.0.0.1:8000/api/task/",{
      "task":task,
      "description":description,
      "assignto":assignto,
      "status":status
    })
  }

  getAllTasks(){
      return this.http.get<{data:any}>("http://127.0.0.1:8000/api/task/")
  }

  storeToken(token:string){
      sessionStorage.setItem('token',token)
  }
}
