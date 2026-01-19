import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
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
  formdata = {task:"",description:"",status:"To Do",assignto:[]}
  submit = false;
  errorMessage="";
  loading=false;
  userRole=""
  userId=""
  allUsers:any[]=[];

  constructor(
    private auth:Auth,
    private cdr: ChangeDetectorRef
  ){}

  @Output() close = new EventEmitter<void>();
  @Output() refreshList = new EventEmitter<void>();
  @Input() editTaskData: any = [];

  ngOnInit(): void{
    this.auth.canAccess()
    this.getAllUsers()
    this.userRole=this.auth.authData?.role;
    this.userId=this.auth.authData?.task_id
    console.log("XXX",this.editTaskData._id.length);
    
    if(this?.editTaskData){
        this.formdata.task=this.editTaskData.task;
        this.formdata.description=this.editTaskData.description;
        this.formdata.status=this.editTaskData.status;
        this.formdata.assignto=this.editTaskData.assignto;
    }
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
        }
      )
  }

  assignedTask(username:string,user_id:string,task_id:string,createBy:string){
  
      this.auth.assignTask(username,user_id,task_id,createBy)
    .subscribe({
        next:(data:any)=>{
            this.refreshList.emit();
            this.onClose();
        },
        error:(data:any)=>{
        if(data?.error?.error){
          console.log("Err",data.error.error);
          
        }else{
          console.log("unknow error occured in creating user !")
        }
        } 
        }
      )
  }

  getUserDetails(_id:string,createBy:string,task_id:string){
    this.auth.getUserById(_id)
    .subscribe({
        next:(data:any)=>{
          console.log("XXX",data);
          
            this.assignedTask(data?.data?.username, data?.data?._id, task_id, createBy)
        },
        error:(data:any)=>{
        if(data?.error?.error){
          console.log("Err",data.error.error);
          
        }else{
          console.log("unknow error occured in creating user !")
        }
        } 
        }
      )
  }

   onSubmit(){

        this.auth.addTask(this.formdata.task,this.formdata.description,this.formdata.status)
        .subscribe({
        next:(res:any)=>{
          console.log("ZZZZ",res)
          this.formdata.assignto?.map((_id)=>(
            this.getUserDetails(_id,this.userId,res.data._id)
          ))
        
        },
        error:(data:any)=>{
        if(data?.error?.error){
          this.errorMessage=data.error.error;
        }else{
          this.errorMessage="unknow error occured in creating user !"
        }
        } 
        })

   }
}
