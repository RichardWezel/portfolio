import { Component, inject} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', './footer.mobile.scss']
})
export class FooterComponent {
  router = inject(Router)

  toImprint() {
    this.router.navigate(['/imprint'])
  }

  
}

