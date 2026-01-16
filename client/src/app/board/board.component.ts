import { Component } from '@angular/core';
import { Auth } from '../_services/auth';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  constructor(private auth:Auth){}

  ngOnInit(): void{
    this.auth.canAccess()
  }
}
