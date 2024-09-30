// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes), provideHttpClient()]
// };

import { importProvidersFrom } from '@angular/core';
// import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Factory-Funktion für den TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig = {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      // RouterModule.forRoot([])
    )
  ]
};
