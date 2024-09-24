import { Component} from '@angular/core';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  currentIndex: number = 0;
  cards: number = 3; // Anzahl der Karten

  previousCard() {
    this.currentIndex = (this.currentIndex - 1 + this.cards) % this.cards;
    this.updateRadioInput();
  }

  nextCard() {
    this.currentIndex = (this.currentIndex + 1) % this.cards;
    this.updateRadioInput();
  }

  private updateRadioInput() {
    const radioButtons = document.querySelectorAll<HTMLInputElement>('input[name="slider"]');
    radioButtons[this.currentIndex].checked = true;
  }
}