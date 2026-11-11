import { Routes } from '@angular/router';
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
