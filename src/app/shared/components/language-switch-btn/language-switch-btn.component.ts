import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';


@Component({
  selector: 'app-language-switch-btn',
  standalone: true,
  imports: [],
  templateUrl: './language-switch-btn.component.html',
  styleUrl: './language-switch-btn.component.scss'
})
export class LanguageSwitchBtnComponent implements OnInit{
  isGerman: boolean = false;
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.isGerman = this.translate.currentLang === 'de';
  }

  toggleLanguage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newLang = input.checked ? 'de' : 'en';
    this.translate.use(newLang);
    localStorage.setItem('lang', newLang);
  }
}
