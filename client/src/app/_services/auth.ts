import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
 
  authData: any = null;
  token=sessionStorage.getItem("token");
  
  constructor(private router:Router, private http:HttpClient) {}

  isAuthenticated():boolean{
    const rawData = localStorage.getItem("user-data");
    if(sessionStorage.getItem('token') !== null){
      this.authData = rawData ? JSON.parse(rawData) : null;
      return true;
    }
    return false;
  }

  storeToken(token:string){
      sessionStorage.setItem('token',token)
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

  getAllUsers(role: string){
    const headers = new HttpHeaders({
        'AUTH': `${this.token}`
      });
  if(role){
    return this.http.get<{data:any}>(`http://127.0.0.1:8000/api/user?role=${role}`,{headers})
  }else{
    return this.http.get<{data:any}>("http://127.0.0.1:8000/api/user/",{headers})
  }
  }

  getUserById(_id:String){
    const headers = new HttpHeaders({
        'AUTH': `${this.token}`
      });
    return this.http.get<{data:String}>(`http://127.0.0.1:8000/api/user/${_id}`,{headers})
  }

  addTask(task:String, description:String,status:String){
    const headers = new HttpHeaders({
        'AUTH': `${this.token}`
      });
   return this.http.post<{data:any}>("http://127.0.0.1:8000/api/task/",{
      "task":task,
      "description":description,
      "status":status
    },{headers})
  }

  updateTask(task_id:string,task:String, description:String,status:String){
    const headers = new HttpHeaders({
        'AUTH': `${this.token}`
      });
    return this.http.put<{data:any}>(`http://127.0.0.1:8000/api/task/${task_id}`,{
      "task":task,
      "description":description,
      "status":status
    },{headers})
  }

  getAllTasks(user_id:string){
    const headers = new HttpHeaders({
        'AUTH': `${this.token}`
      });
      return this.http.get<{data:any}>(`http://127.0.0.1:8000/api/task/${user_id}`,{headers})
  }

  getTaskById(task_id:string){
    const headers = new HttpHeaders({
      'AUTH': `${this.token}`
    });
    return this.http.get<{data:String}>(`http://127.0.0.1:8000/api/task/${task_id}`,{headers})
  }

  deleteTask(task_id:String){
    const headers = new HttpHeaders({
        'AUTH': `${this.token}`
    });
    return this.http.delete<({response:String})>(`http://127.0.0.1:8000/api/task/${task_id}`,{headers})
  }

  assignTask(username:string,user_id:string,task_id:string){
    const headers = new HttpHeaders({
        'AUTH': `${this.token}`
    });
    return this.http.post<{data:any}>("http://127.0.0.1:8000/api/task/assigntask",{
      "username":username,
      "user_id":user_id,
      "task_id":task_id
    },{headers})
  }

  getAssignedUsers(task_id:String){
      const headers = new HttpHeaders({
        'AUTH': `${this.token}`
      });
      return this.http.get<{data:String}>(`http://127.0.0.1:8000/api/task/getassignedusers/${task_id}`,{headers})
  }

  
  reAssignTask(assign_id:String){
    const headers = new HttpHeaders({
        'AUTH': `${this.token}`
    });
    return this.http.delete<{data:any}>(`http://127.0.0.1:8000/api/task/reassigntask/${assign_id}`,{headers})
  }
  
}
