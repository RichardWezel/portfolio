import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-colleagues-voices',
  standalone: true,
  templateUrl: './colleagues-voices.component.html',
  styleUrls: ['./colleagues-voices.component.scss'],
  imports: [CommonModule]
})
export class ColleaguesVoicesComponent implements AfterViewInit {
  items = [
    { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', author: 'H. Janisch - Team Partner' },
    { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis esse nam excepturi blanditiis facilis ex nulla natus unde alias? Fugiat maxime dolor a nam eum magni facilis, molestiae quos maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eum impedit consequuntur animi quae aliquam quasi ipsum blanditiis, dignissimos commodi. Fugiat, minima pariatur a laudantium dicta iste facilis officia ab?', author: 'K. Müller - Manager' },
    { text: 'jsdjohf osdjoif ijsd fjskd jfkj sdyjf djs gfjdrkj gkfjd kpjgkp dfk  jgkvjstr kpdfjgkv dsfkj gkjdfk jgskvlj fdkljg kvjfdkls gkjdf kjg ', author: 'Z. Wezel - Developer' },
  ];

  displayedItems = [...this.items]; // Initiale Anzeige

  ngAfterViewInit() {
    this.updateClasses();
  }

  // Aktualisiere die Position der Items anhand ihrer Position im Array
  updateClasses() {
    const items = document.querySelectorAll('.item');
    items.forEach((item, index) => {
        console.log(`Position für Item ${index}:`, item); // Debugging
        item.classList.remove('left', 'right', 'active');
        if (index === 0) {
            item.classList.add('left');
        } else if (index === 1) {
            item.classList.add('active');
        } else {
            item.classList.add('right');
        }
    });
}


  handleClick(direction: 'previous' | 'next') {
    if (direction === 'previous') {
      const lastItem = this.displayedItems.pop();
      if (lastItem) {
        this.displayedItems.unshift(lastItem);
      }
    } else {
      const firstItem = this.displayedItems.shift();
      if (firstItem) {
        this.displayedItems.push(firstItem);
      }
    }

    // Aktualisiere die Klassen nach dem Klick
    this.updateClasses();
  }
}
