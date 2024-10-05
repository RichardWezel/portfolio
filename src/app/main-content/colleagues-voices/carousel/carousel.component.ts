import { Component} from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  currentIndex: number = 0;
  cards: number = 3; // Anzahl der Karten

  previousCard() {
    console.log('previousCard clicked');
    this.currentIndex = (this.currentIndex - 1 + this.cards) % this.cards;
    this.updateRadioInput();
  }

  nextCard() {
    console.log('nextCard clicked');
    this.currentIndex = (this.currentIndex + 1) % this.cards;
    this.updateRadioInput();
  }

  private updateRadioInput() {
    const radioButtons = document.querySelectorAll<HTMLInputElement>('input[name="slider"]');
    radioButtons[this.currentIndex].checked = true;
  }
}