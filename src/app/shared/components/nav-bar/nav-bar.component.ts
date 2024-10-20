import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common'; // Importieren Sie CommonModule
import { SharedModule } from './../../shared.module';
import { LanguageSwitchBtnComponent } from './../language-switch-btn/language-switch-btn.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, SharedModule, LanguageSwitchBtnComponent],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss', './nav-bar.mobile.scss']
})
export class NavBarComponent {

  isActive = false;

  toggleSlide() {
    this.isActive = !this.isActive;
  }
}
