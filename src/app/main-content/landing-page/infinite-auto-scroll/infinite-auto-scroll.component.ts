import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-infinite-auto-scroll',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './infinite-auto-scroll.component.html',
  styleUrl: './infinite-auto-scroll.component.scss'
})
export class InfiniteAutoScrollComponent {

}
