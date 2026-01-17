import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-formdialog',
  imports: [],
  templateUrl: './formdialog.component.html',
  styleUrl: './formdialog.component.css',
})
export class FormdialogComponent {

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
