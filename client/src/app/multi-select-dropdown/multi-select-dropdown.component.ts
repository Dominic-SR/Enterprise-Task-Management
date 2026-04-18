import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-multi-select-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multi-select-dropdown.component.html',
  styleUrl: './multi-select-dropdown.component.css'
})
export class MultiSelectDropdownComponent {
  @Input() set selectedItems(items: any[]) {
    this.selectedValues = items && Array.isArray(items) ? [...items] : [];
  }
  
  @Input() options: any[] = [];
  @Input() displayProperty: string = 'username';
  @Input() valueProperty: string = '_id';
  @Input() placeholder: string = 'Select options';
  
  @Output() selectedItemsChange = new EventEmitter<any[]>();
  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;

  selectedValues: any[] = [];
  isOpen = false;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: any): void {
    const value = option[this.valueProperty];
    const index = this.selectedValues.indexOf(value);
    
    if (index > -1) {
      this.selectedValues.splice(index, 1);
    } else {
      this.selectedValues.push(value);
    }
    
    this.updateValue();
  }

  removeOption(value: any, event: Event): void {
    event.stopPropagation();
    const index = this.selectedValues.indexOf(value);
    if (index > -1) {
      this.selectedValues.splice(index, 1);
    }
    this.updateValue();
  }

  isSelected(option: any): boolean {
    return this.selectedValues.includes(option[this.valueProperty]);
  }

  getOptionLabel(value: any): string {
    const option = this.options.find(opt => opt[this.valueProperty] === value);
    return option ? option[this.displayProperty] : value;
  }

  getSelectedLabels(): string {
    return this.selectedValues
      .map(val => {
        const option = this.options.find(opt => opt[this.valueProperty] === val);
        return option ? option[this.displayProperty] : val;
      })
      .join(', ');
  }

  private updateValue(): void {
    this.selectedItemsChange.emit([...this.selectedValues]);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.dropdownContainer && !this.dropdownContainer.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
