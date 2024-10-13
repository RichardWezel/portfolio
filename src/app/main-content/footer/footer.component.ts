import { Component} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ImprintService } from './../../services/imprint.service'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', './footer.mobile.scss']
})
export class FooterComponent {

  constructor(private imprintService: ImprintService) {}

  // Methode zum Öffnen des Imprint
  openImprint(event: Event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Links
    this.imprintService.show();
  }


}
