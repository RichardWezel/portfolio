import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import Flickity from 'flickity';
import { CardComponent } from "./card/card.component";

interface Card {
  content: string;
  author: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @Input() cards: Card[] = [];
  @Output() indexChange: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('flickityRef') flickityRef!: ElementRef;

  private flkty!: Flickity;

  ngAfterViewInit(): void {
    this.initializeFlickity();
  }

  ngOnDestroy(): void {
    if (this.flkty) {
      this.flkty.destroy();
    }
  }

  initializeFlickity(): void {
    this.flkty = new Flickity(this.flickityRef.nativeElement, {
      wrapAround: true,
      contain: true,
      pageDots: false,
      prevNextButtons: false,
      cellAlign: 'center',
      initialIndex: 0,
      // Weitere Optionen nach Bedarf
    });

    // Emit the initial index
    this.indexChange.emit(this.flkty.selectedIndex % this.cards.length);

    // Event Listener für Indexänderungen
    this.flkty.on('select', () => {
      this.indexChange.emit(this.flkty.selectedIndex % this.cards.length);
    });
  }

  // Methoden zur Steuerung des Karussells
  next(): void {
    this.flkty.next(true);
  }

  previous(): void {
    this.flkty.previous(true);
  }

  select(index: number): void {
    this.flkty.select(index, true, false);
  }
}