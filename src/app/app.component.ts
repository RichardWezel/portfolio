import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  constructor(private translate: TranslateService) {
    // Unterstützte Sprachen hinzufügen
    translate.addLangs(['en', 'de']);

    // Gespeicherte Sprache aus localStorage abrufen
    const savedLang = localStorage.getItem('lang');

    // Sprache basierend auf Browser-Einstellungen oder gespeicherter Sprache setzen
    const browserLang = translate.getBrowserLang();

    // Überprüfen, ob browserLang eine unterstützte Sprache ist
    const isSupportedBrowserLang = browserLang && ['en', 'de'].includes(browserLang);

    // Setze defaultLang auf savedLang, oder auf browserLang falls unterstützt, sonst auf 'en'
    const defaultLang: string = savedLang || (isSupportedBrowserLang ? browserLang : 'en');

    // Standardsprache setzen
    translate.setDefaultLang('en');

    // Sprache verwenden
    translate.use(defaultLang);
  }
}
