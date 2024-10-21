import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainContentComponent } from './main-content/main-content.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
   {path: '', component: MainContentComponent},
   {path: 'imprint', component: ImprintComponent},
   {path: 'privasy-policy', component: PrivacyPolicyComponent},
];

const routerOptions: ExtraOptions = {
   anchorScrolling: 'enabled',
 };

 @NgModule({
   imports: [RouterModule.forRoot(routes, routerOptions)],
   exports: [RouterModule]
 })

 export class AppRoutingModule { }