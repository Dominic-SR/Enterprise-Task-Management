import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../_services/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

    formdata = {name:"",email:"",password:""} 
    submit = false;
    errorMessage="";
    loading=false;

    constructor(private auth:Auth,private router:Router){}

    loginpage(){
      this.router.navigate(["login"]);
    }

    ngOnInit(): void{
      this.auth.canAuthenticate();
    }

    onSubmit(){
      this.loading=true;
      this.auth.register(this.formdata.name,this.formdata.email,this.formdata.password)
      .subscribe({
        next:(data:any)=>{
          this.auth.storeToken(data.token);
          localStorage.setItem('user-data',JSON.stringify(data.data))
          this.auth.canAuthenticate()
        },
        error:(data:any)=>{
        if(data?.error?.error){
          this.errorMessage=data.error.error;
        }else{
          this.errorMessage="unknow error occured in creating user !"
        }
        } 
        },
      ).add(()=>{
        this.loading=false;
      })
    }

}
