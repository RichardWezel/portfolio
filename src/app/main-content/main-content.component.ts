import { Component } from '@angular/core';
import { NavBarComponent } from "./landing-page/nav-bar/nav-bar.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { AboutMeComponent } from "./about-me/about-me.component";
import { SkillSetComponent } from "./skill-set/skill-set.component";
import { FeaturedProjectsComponent } from "./featured-projects/featured-projects.component";
import { ColleaguesVoicesComponent } from "./colleagues-voices/colleagues-voices.component";
import { ContactMeComponent } from "./contact-me/contact-me.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [NavBarComponent, LandingPageComponent, AboutMeComponent, SkillSetComponent, FeaturedProjectsComponent, ColleaguesVoicesComponent, ContactMeComponent, FooterComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}