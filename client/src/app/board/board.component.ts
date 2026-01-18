import { Component } from '@angular/core';
import { Auth } from '../_services/auth';
import { FormdialogComponent } from "../formdialog/formdialog.component"

@Component({
  selector: 'app-board',
  imports: [FormdialogComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  isModalOpen=false;
  editingTask=null;
  allUsers=[];
  // editingTask : Task | null = null;
  constructor(private auth:Auth){}

  ngOnInit(): void{
    this.auth.canAccess()
  }

 


  openModal(){
  this.editingTask =  null;
  this.isModalOpen = true;
}

   closeModal() {
    this.isModalOpen = false;
    this.editingTask = null;
  }
}
