import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../../../app/shared/shared.module';
import { LanguageSwitchBtnComponent } from '../../../shared/components/language-switch-btn/language-switch-btn.component';
import { NgClass, NgStyle, NgIf, CommonModule } from '@angular/common';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [SharedModule, LanguageSwitchBtnComponent, NgStyle, NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss', './nav-bar.mobile.scss']
})
export class NavBarComponent {

  isActive = false;

  toggleSlide() {
    this.isActive = !this.isActive;
  }
}
