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

  /** Setzt Seitentitel und Meta-Description passend zu Route und Sprache. */
  private updateTags(): void {
    const route = this.routeKey(this.router.url);
    this.translate.get([`SEO.${route}.title`, `SEO.${route}.description`]).subscribe(texts => {
      this.title.setTitle(texts[`SEO.${route}.title`]);
      this.meta.updateTag({ name: 'description', content: texts[`SEO.${route}.description`] });
    });
  }

  /** Ordnet den Routenpfad einem Schlüssel im SEO-Block der Sprachdateien zu. */
  private routeKey(url: string): string {
    const path = url.split('#')[0].split('?')[0].replace(/^\//, '');
    switch (path) {
      case 'lebenslauf': return 'cv';
      case 'imprint': return 'imprint';
      case 'privacy-policy': return 'privacy';
      default: return 'home';
    }
  }
}
