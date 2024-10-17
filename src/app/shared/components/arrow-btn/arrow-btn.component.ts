import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-arrow-btn',
  standalone: true,
  imports: [],
  templateUrl: './arrow-btn.component.html',
  styleUrls: ['./arrow-btn.component.scss']
})
export class ArrowBtnComponent {

  @Output() clicked = new EventEmitter<void>();

  onClick(event: Event) {
    event.stopPropagation();
    this.clicked.emit();
  }
}