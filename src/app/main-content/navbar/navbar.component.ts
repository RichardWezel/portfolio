import { Component, inject, ElementRef, HostListener } from '@angular/core';
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

  private eRef = inject(ElementRef);

  toggleSlide() {
    this.isActive = !this.isActive;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isActive && !this.eRef.nativeElement.contains(event.target)) {
      this.isActive = false;
    }
  }

  router = inject(Router)

  toMain() {
    this.router.navigate(['/'])
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    this.isActive = false;
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    this.router.navigateByUrl('/').then(() => {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  }
}
