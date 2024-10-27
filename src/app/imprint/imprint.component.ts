
import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'
import { Router } from '@angular/router';
import { NavbarComponent } from '../main-content/navbar/navbar.component';
import { FooterComponent } from '../main-content/footer/footer.component';
import { MenuComponent } from '../main-content/menu/menu.component';


@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule, SharedModule, NavbarComponent, FooterComponent, MenuComponent],
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss', './imprint.mobile.scss']
})
export class ImprintComponent  {
  
  router = inject(Router)

  toMain() {
    this.router.navigate(['/'])
  }
}
