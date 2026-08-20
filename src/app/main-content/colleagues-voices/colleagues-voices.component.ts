import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "./carousel/carousel.component";
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-colleagues-voices',
  standalone: true,
  templateUrl: './colleagues-voices.component.html',
  styleUrls: ['./colleagues-voices.component.scss', './colleagues-voices.mobile.scss'],
  imports: [CommonModule, CarouselComponent, SharedModule]
})
export class ColleaguesVoicesComponent {
  @ViewChild(CarouselComponent) carousel!: CarouselComponent;

  currentIndex: number = 0;

  onIndexChange(index: number): void {
    this.currentIndex = index;
  }
}