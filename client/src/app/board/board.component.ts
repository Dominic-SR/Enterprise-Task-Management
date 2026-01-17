import { Component } from '@angular/core';
import { Auth } from '../_services/auth';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  isModalOpen=false;
  editingTask=null;
  // editingTask : Task | null = null;
  constructor(private auth:Auth){}

  ngOnInit(): void{
    this.auth.canAccess()
  }


  openModal(task:null){
  this.editingTask = task;
  this.isModalOpen = true;
}

   closeModal() {
    this.isModalOpen = false;
    this.editingTask = null;
  }
}
