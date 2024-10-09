import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-infinite-auto-scroll',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './infinite-auto-scroll.component.html',
  styleUrls: ['./infinite-auto-scroll.component.scss', './infinite-auto-scroll.mobile.scss']
})
export class InfiniteAutoScrollComponent {

}
