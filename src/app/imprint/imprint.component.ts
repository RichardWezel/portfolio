
import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'
import { Router } from '@angular/router';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss', './imprint.mobile.scss']
})
export class ImprintComponent  {
  
  router = inject(Router)

  toMain() {
    this.router.navigate(['/'])
  }
}
