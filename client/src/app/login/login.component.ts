import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../_services/auth';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  formdata = {email:"",password:""}
  submit = false;
  errorMessage="";
  loading=false;

  constructor(
    private auth:Auth,
    private router:Router,
    private cdr: ChangeDetectorRef
  ){}
  registerpage(){
    this.router.navigate(["register"]);
  }

   ngOnInit(): void{
      this.auth.canAuthenticate();
  }

  onSubmit(){
    this.loading=true;
      this.auth.login(this.formdata.email,this.formdata.password)
    .subscribe({
      next:(data:any)=>{
        this.auth.storeToken(data.token);
        localStorage.setItem('user-data',JSON.stringify(data.data));
        this.auth.canAuthenticate();
      },
      error:(data:any)=>{
       
        
      if(data?.error?.error){  
        this.errorMessage=data.error.error;
      }else if(data?.error){
        this.errorMessage= data?.error.message;
      }else{
        this.errorMessage="unknow error occured in creating user !"
      }
      } 
      },
    ).add(()=>{
      this.loading=false;
      this.cdr.detectChanges(); // 4. Force UI refresh here too
      console.log("Loading finalized as:", this.loading);
    })
  }

}
