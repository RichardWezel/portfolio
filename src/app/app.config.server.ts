import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { appConfig } from './app.config';

/**
 * Beim Prerendern läuft kein HTTP-Server, der HttpLoader aus app.config
 * könnte assets/i18n also nicht laden und die Texte wären im HTML leer.
 * Dieser Loader liest die Sprachdateien stattdessen direkt von der Platte.
 */
class FsTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<Record<string, unknown>> {
    const file = join(process.cwd(), 'src', 'assets', 'i18n', `${lang}.json`);
    return of(JSON.parse(readFileSync(file, 'utf-8')));
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: TranslateLoader, useClass: FsTranslateLoader }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
