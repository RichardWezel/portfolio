import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta,
    private translate: TranslateService) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTags();
    });

    this.translate.onLangChange.subscribe(() => {
      this.updateTags();
    });
  }

  /** Setzt Seitentitel, Beschreibung und Vorschaukarte passend zu Route und Sprache. */
  private updateTags(): void {
    const route = this.routeKey(this.router.url);
    const url = this.canonicalUrl();
    this.translate.get([`SEO.${route}.title`, `SEO.${route}.description`]).subscribe(texts => {
      const title = texts[`SEO.${route}.title`];
      const description = texts[`SEO.${route}.description`];

      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ property: 'og:locale', content: this.ogLocale() });
      this.setCanonical(url);
    });
  }

  /** Ordnet den Routenpfad einem Schlüssel im SEO-Block der Sprachdateien zu. */
  private routeKey(url: string): string {
    switch (this.path(url)) {
      case 'lebenslauf': return 'cv';
      case 'imprint': return 'imprint';
      case 'privacy-policy': return 'privacy';
      default: return 'home';
    }
  }

  /** Kanonische Adresse der aktuellen Route; /main zeigt auf die Startseite. */
  private canonicalUrl(): string {
    const path = this.path(this.router.url);
    return path === '' || path === 'main'
      ? `${window.location.origin}/`
      : `${window.location.origin}/${path}`;
  }

  private path(url: string): string {
    return url.split('#')[0].split('?')[0].replace(/^\//, '');
  }

  private ogLocale(): string {
    return this.translate.currentLang === 'de' ? 'de_DE' : 'en_US';
  }

  private setCanonical(url: string): void {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
