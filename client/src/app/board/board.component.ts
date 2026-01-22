import { ChangeDetectorRef, Component } from '@angular/core';
import { Auth } from '../_services/auth';
import { FormdialogComponent } from "../formdialog/formdialog.component"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [
    FormdialogComponent,
    CommonModule
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  isModalOpen=false;
  assignees: { [taskId: string]: any } = {};
  allTasks:any[]=[];
  toDoTask:any[]=[];
  inProgressTask:any[]=[];
  doneTask:any[]=[];
  editingTask:any []= [];
  getAssignPersonsData=[]
  constructor(
    private auth:Auth,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void{
    this.auth.canAccess()
    this.getAllTasks()
  }

  openModal(){
  this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingTask=[]
  }

    getAssignedPersons(task_id:string){
    this.auth.getAssignedUsers(task_id)
      .subscribe({
        next:(data:any)=>{
          this.getAssignPersonsData= data.data;
          console.log("111>>>>",data.data);
          this.assignees[task_id] = data.data;
          console.log(">>>>",this.assignees);
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

  getAllTasks(){
     this.auth.getAllTasks()
      .subscribe({
        next:(data:any)=>{
          this.allTasks=data.data;
          
          const categorized = this.allTasks.reduce((acc, task) => {
          if (task.status === "To Do") acc.todo.push(task);
          else if (task.status === "In Progress") acc.inprogress.push(task);
          else if (task.status === "Done") acc.done.push(task);
          return acc;
          }, { todo: [], inprogress: [], done: [] });

          // Assign them back to your class properties
          this.toDoTask = categorized.todo;
          this.inProgressTask = categorized.inprogress;
          this.doneTask = categorized.done;
          // Create an array of requests
         this.allTasks.forEach((task: any) => {
            this.getAssignedPersons(task._id);
          });
          
          // this.allTasks.forEach((task:any) => {
          //    console.log("Before CALL")
          //  this.getAssignedPersons(task._id);
          //   this.assignees[task._id] = this.getAssignPersonsData;
          //   console.log("AFter CALL",this.getAssignPersonsData);
          // });
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



  editTask(task_id:string){
   
    this.auth.getTaskById(task_id)
      .subscribe({
        next:(data:any)=>{
          let getTask = data.data;
          this.getAssignedPersons(task_id)
          getTask.assignto = this.getAssignPersonsData;
          this.editingTask=getTask;
          
          this.openModal()
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

  deleteTask(task_id:string){
    
    this.auth.deleteTask(task_id)
      .subscribe({
        next:(data:any)=>{
         this.getAllTasks()
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
}
