import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';


@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss', './about-me.mobile.scss']
})
export class AboutMeComponent {

}
