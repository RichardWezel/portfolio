import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "./carousel/carousel.component";
import { SharedModule } from '../../shared/shared.module';

interface Card {
  content: string;
  author: string;
}

@Component({
  selector: 'app-colleagues-voices',
  standalone: true,
  templateUrl: './colleagues-voices.component.html',
  styleUrls: ['./colleagues-voices.component.scss', './colleagues-voices.mobile.scss'],
  imports: [CommonModule, CarouselComponent, SharedModule]
})
export class ColleaguesVoicesComponent {
  @ViewChild(CarouselComponent) carousel!: CarouselComponent;

  cards: Card[] = [
    {
      content: '„Deine Arbeit ist stets von höchster Qualität und du bist ein großartiger Teamplayer.“',
      author: 'Hans Wurst'
    },
    {
      content: '„Exzellente Arbeitsmoral und immer bereit, über das Erwartete hinauszugehen.“',
      author: 'Maria Musterfrau'
    },
    {
      content: '„Konsequent liefert du hochwertige Ergebnisse fristgerecht.“',
      author: 'Max Mustermann'
    },
    {
      content: '„Eine Freude mit der Arbeit, immer positiv und proaktiv.“',
      author: 'Erika Beispiel'
    },
  ];

  currentIndex: number = 0;

  onIndexChange(index: number): void {
    this.currentIndex = index;
  }
}