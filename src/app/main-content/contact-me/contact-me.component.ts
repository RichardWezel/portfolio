import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [NgIf],
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent {
  isEmailHovered = false;
  isTextHovered = false; 
  isChecked: boolean = false;

  toggleCheckbox(): void {
    this.isChecked = !this.isChecked;
    console.log('Checkbox state:', this.isChecked);
  }
}
