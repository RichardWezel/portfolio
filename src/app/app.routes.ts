import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainContentComponent } from './main-content/main-content.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CvTimelineComponent } from './cv-timeline/cv-timeline.component';

export const routes: Routes = [
   {path: '', component: MainContentComponent},
   {path: 'main', component: MainContentComponent},
   {path: 'imprint', component: ImprintComponent},
   {path: 'privacy-policy', component: PrivacyPolicyComponent},
   {path: 'lebenslauf', component: CvTimelineComponent},
];

const routerOptions: ExtraOptions = {
   anchorScrolling: 'enabled',
   scrollPositionRestoration: 'enabled', // Fügt diese Zeile hinzu
 };

 @NgModule({
   imports: [RouterModule.forRoot(routes, routerOptions)],
   exports: [RouterModule]
 })

 export class AppRoutingModule { }