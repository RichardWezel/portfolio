// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    // Füge die Routen hinzu
    provideRouter(routes)
  ]
})
.catch((err) => console.error(err));
