import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../../../shared/shared.module';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{

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
