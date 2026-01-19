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
  formdata = {task:"",description:"",createBy:"",status:"To Do",assignto:[]}
  submit = false;
  errorMessage="";
  loading=false;
  userRole=""
  allUsers:any[]=[];

  constructor(
    private auth:Auth,
    private cdr: ChangeDetectorRef
  ){}

  @Output() close = new EventEmitter<void>();
  @Output() refreshList = new EventEmitter<void>();

  ngOnInit(): void{
    this.auth.canAccess()
    this.getAllUsers()
    this.userRole=this.auth.authData?.role;
  }

  onClose(): void {
    this.close.emit();
  }

   getAllUsers(){
     this.auth.getAllUsers()
      .subscribe({
        next:(data:any)=>{
          this.allUsers=data.data
          this.cdr.detectChanges();
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
    console.log("XXX",this.formdata);
    
        // this.auth.addTask(this.formdata.task,this.formdata.description,this.userRole && this.userRole,this.formdata.status)
        // .subscribe({
        // next:(res:any)=>{
        // this.refreshList.emit();
        // this.onClose();
        
        // },
        // error:(data:any)=>{
        // if(data?.error?.error){
        //   this.errorMessage=data.error.error;
        // }else{
        //   this.errorMessage="unknow error occured in creating user !"
        // }
        // } 
        // })

   }
}
