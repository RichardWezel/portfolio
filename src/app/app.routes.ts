import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainContentComponent } from './main-content/main-content.component';
import { ImprintComponent } from './main-content/imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutMeComponent } from './main-content/about-me/about-me.component';
import { SkillSetComponent } from './main-content/skill-set/skill-set.component';
import { FeaturedProjectsComponent } from './main-content/featured-projects/featured-projects.component';

export const routes: Routes = [
   {path: '', component: MainContentComponent},
   {path: 'imprint', component: ImprintComponent},
   {path: 'privasy-policy', component: PrivacyPolicyComponent},
   {path: 'about-me', component: AboutMeComponent},
   {path: 'skills', component: SkillSetComponent},
   {path: 'projects', component: FeaturedProjectsComponent},
];

const routerOptions: ExtraOptions = {
   anchorScrolling: 'enabled',
 };

 @NgModule({
   imports: [RouterModule.forRoot(routes, routerOptions)],
   exports: [RouterModule]
 })

 export class AppRoutingModule { }