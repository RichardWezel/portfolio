import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Card {
  content: string;
  author: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card!: Card;
}
