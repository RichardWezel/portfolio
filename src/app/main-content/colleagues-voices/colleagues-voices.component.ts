import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-colleagues-voices',
  standalone: true,  // Stelle sicher, dass standalone auf true gesetzt ist
  templateUrl: './colleagues-voices.component.html',
  styleUrls: ['./colleagues-voices.component.scss']
})
export class ColleaguesVoicesComponent implements AfterViewInit {
  
  @ViewChild('list', { static: false }) list!: ElementRef;
  itemWidth: number = 0;

  ngAfterViewInit() {
    const item = this.list.nativeElement.querySelector('.item');
    if (item) {
      this.itemWidth = item.offsetWidth;
    }
  }

  handleClick(direction: 'previous' | 'next') {
    const listElement = this.list.nativeElement;
    if (direction === 'previous') {
      listElement.scrollBy({ left: -334, behavior: 'smooth' });
    } else {
      listElement.scrollBy({ left: 334, behavior: 'smooth' });
    }
  }
}

