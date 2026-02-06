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
  formdata = {task:"",description:"",status:"To Do",assignto:[] as any[]}
  submit = false;
  errorMessage="";
  loading=false;
  userRole=""
  userId=""
  allUsers:any[]=[];
  getUsers:any[]=[];
  assignedUsers:any[]=[]

  constructor(
    private auth:Auth,
    private cdr: ChangeDetectorRef
  ){}

  @Output() close = new EventEmitter<void>();
  @Output() refreshList = new EventEmitter<void>();
  @Input() editTaskData: any = {};

  ngOnInit(): void{
    this.auth.canAccess()
    this.getAllUsers()
    this.userRole=this.auth.authData?.role;
    this.userId=this.auth.authData?.task_id;
    
    if(this?.editTaskData){
        this?.editTaskData?._id && this.getAssignedPersons(this?.editTaskData?._id)
        this.formdata.task=this.editTaskData.task;
        this.formdata.description=this.editTaskData.description;
        this.formdata.status=this.editTaskData.status;
        this.formdata.assignto=this.assignedUsers;
    }
  }

  onClose(): void {
    this.close.emit();
  }

  getAssignedPersons(task_id:string){
      this.auth.getAssignedUsers(task_id)
      .subscribe({
        next:(data:any)=>{
        data.data.map((i: any) => this.assignedUsers.push(i.user_id));
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
      ).add(()=>{
         this.cdr.detectChanges(); // 4. Force UI refresh here too
      })
  }

   getAllUsers(){

    let role
    if(this.auth.authData.role !== "Super Admin"){
      role = "User"
    }else{
      role = ""
    }

     this.auth.getAllUsers(role)
      .subscribe({
        next:(data:any)=>{
          this.allUsers=data.data;          
          // this.getUsers=
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

  assignedTask(username:string,user_id:string,task_id:string){
  console.log("DDASSS",task_id);
  
      this.auth.assignTask(username,user_id,task_id)
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

  getUserDetailsForAssignUsers(_id:string,task_id:string){
    this.auth.getUserById(_id)
    .subscribe({
        next:(data:any)=>{
            // let filterUsers = data?.filter((data:any)=>data?._id !== data?._id)
            //             console.log("after filte", filterUsers);
            this.assignedTask(data?.data?.username, data?.data?._id, task_id)
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
  if(Object.keys(this.editTaskData).length > 0){
 
      this.auth.updateTask(this.editTaskData?._id,this.formdata.task,this.formdata.description,this.formdata.status)
        .subscribe({
        next:(taskData:any)=>{
          this.formdata.assignto?.map((user_id)=>(  
            this.getUserDetailsForAssignUsers(user_id,taskData?.data?._id)
          ))
          this.refreshList.emit();
          this.onClose();
        },
        error:(data:any)=>{
        if(data?.error?.error){
          this.errorMessage=data.error.error;
        }else{
          this.errorMessage="unknow error occured in creating user !"
        }
        } 
        })
  }else{
        this.auth.addTask(this.formdata.task,this.formdata.description,this.formdata.status)
        .subscribe({
        next:(taskData:any)=>{
          this.formdata.assignto?.map((user_id)=>(
            this.getUserDetailsForAssignUsers(user_id,taskData?.data?._id)
          ))
          this.refreshList.emit();
          this.onClose();
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
}
