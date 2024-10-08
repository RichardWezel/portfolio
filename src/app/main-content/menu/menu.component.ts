import { Component, OnInit } from '@angular/core';
import { LanguageSwitchBtnComponent } from "../../shared/components/language-switch-btn/language-switch-btn.component";
import { SharedModule } from '../../shared/shared.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [LanguageSwitchBtnComponent, SharedModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  // isGerman: boolean = false;
  // constructor(private translate: TranslateService) {}

  // ngOnInit(): void {
  //   this.isGerman = this.translate.currentLang === 'de';
  // }

  // toggleLanguage(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   const newLang = input.checked ? 'de' : 'en';
  //   this.translate.use(newLang);
  //   localStorage.setItem('lang', newLang);
  // }
}


  

