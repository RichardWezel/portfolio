import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../app/shared/shared.module';
import { LanguageSwitchBtnComponent } from '../../shared/components/language-switch-btn/language-switch-btn.component';
import { NgClass, NgStyle } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule, LanguageSwitchBtnComponent, NgStyle, NgClass],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', './navbar.mobile.scss']
})
export class NavbarComponent {
  isActive = false;

  toggleSlide() {
    this.isActive = !this.isActive;
  }

  router = inject(Router)

  toMain() {
    this.router.navigate(['/'])
  }
}
