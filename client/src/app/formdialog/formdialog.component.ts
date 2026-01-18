import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
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
  formdata = {task:"",description:"",assignto:"",status:""}
  submit = false;
  errorMessage="";
  loading=false;
    allUsers:any[]=[];

  constructor(
    private auth:Auth,
    private cdr: ChangeDetectorRef
  ){}

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
        this.auth.addTask(this.formdata.task,this.formdata.description,this.formdata.assignto,this.formdata.status)
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
        }).add(()=>{
         this.cdr.detectChanges(); // 4. Force UI refresh here too
         this.onClose();
      })

   }
}
