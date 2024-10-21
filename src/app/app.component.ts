import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';
import { NavBarComponent } from "./main-content/landing-page/nav-bar/nav-bar.component";
import { FooterComponent } from "./main-content/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  constructor(private translate: TranslateService) {

    translate.addLangs(['en', 'de']);

    const savedLang = localStorage.getItem('lang');
    const browserLang = translate.getBrowserLang();
    const isSupportedBrowserLang = browserLang && ['en', 'de'].includes(browserLang);
    const defaultLang: string = savedLang || (isSupportedBrowserLang ? browserLang : 'en');

    translate.setDefaultLang('en');
    translate.use(defaultLang);
  }
}