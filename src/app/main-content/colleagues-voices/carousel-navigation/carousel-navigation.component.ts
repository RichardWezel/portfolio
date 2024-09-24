import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-navigation.component.html',
  styleUrls: ['./carousel-navigation.component.scss']
})
export class CarouselNavigationComponent {
  @Input() total: number = 0;
  @Input() currentIndex: number = 0;

  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  @Output() previous: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectDot: EventEmitter<number> = new EventEmitter<number>();

  onNext(): void {
    this.next.emit();
  }

  onPrevious(): void {
    this.previous.emit();
  }

  onSelectDot(index: number): void {
    this.selectDot.emit(index);
  }

  // Hilfsfunktion zur Erstellung eines Arrays basierend auf der Gesamtzahl
  getDotsArray(): number[] {
    return Array(this.total).fill(0).map((_, i) => i);
  }
}
