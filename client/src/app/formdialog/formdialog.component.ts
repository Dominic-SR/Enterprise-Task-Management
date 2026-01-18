import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../_services/auth';

@Component({
  selector: 'app-formdialog',
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './formdialog.component.html',
  styleUrl: './formdialog.component.css',
})
export class FormdialogComponent {
  formdata = {task:"",description:"",assignto:""}
  submit = false;
  errorMessage="";
  loading=false;
    allUsers:any[]=[];

  constructor(private auth:Auth){}

  @Output() close = new EventEmitter<void>();

  ngOnInit(): void{
    this.auth.canAccess()
    this.getAllUsers()
  }

  onClose(): void {
    this.close.emit();
  }

   getAllUsers(){
     this.auth.getAllUsers()
      .subscribe({
        next:(data:any)=>{
          this.allUsers=data.data
        },
        error:(data:any)=>{
        if(data?.error?.error){
          console.log("Err",data.error.error);
          
        }else{
          console.log("unknow error occured in creating user !")
        }
        } 
        },
      )
  }

   onSubmit(){
console.log("ffff",this.formdata);

   }
}
