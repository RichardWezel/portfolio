import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from "./main-content/footer/footer.component";
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ScrollService } from './services/scroll.service';
import { NavbarComponent } from "./main-content/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, NavbarComponent, FooterComponent, ImprintComponent, PrivacyPolicyComponent, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';

  router = inject(Router)

  constructor(
    private translate: TranslateService,
    private scrollService: ScrollService) {

    translate.addLangs(['en', 'de']);

    const savedLang = localStorage.getItem('lang');
    const browserLang = translate.getBrowserLang();
    const isSupportedBrowserLang = browserLang && ['en', 'de'].includes(browserLang);
    const defaultLang: string = savedLang || (isSupportedBrowserLang ? browserLang : 'en');

    translate.setDefaultLang('en');
    translate.use(defaultLang);
  }

  navigate() {
    this.router.navigate(['/imprint'])
  }
}