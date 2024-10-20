import { Component} from '@angular/core';
import { ImprintService } from './../../../services/imprint.service'
import { SharedModule } from './../../shared.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', './footer.mobile.scss']
})
export class FooterComponent {

  constructor(private imprintService: ImprintService) {}

  openImprint(event: Event) {
    event.preventDefault(); 
    this.imprintService.show();
  }
}