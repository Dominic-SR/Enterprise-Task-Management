import { Component } from '@angular/core';
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
  editingTask=null;
  allTasks:any[]=[];
  // editingTask : Task | null = null;
  constructor(private auth:Auth){}

  ngOnInit(): void{
    this.auth.canAccess()
    this.getAllTasks()
  }

  openModal(){
  this.editingTask =  null;
  this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingTask = null;
  }

  getAllTasks(){
     this.auth.getAllTasks()
      .subscribe({
        next:(data:any)=>{
          this.allTasks=data.data
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
