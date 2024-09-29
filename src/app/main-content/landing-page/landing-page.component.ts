import { Component } from '@angular/core';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { InfiniteAutoScrollComponent } from "./infinite-auto-scroll/infinite-auto-scroll.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavBarComponent, InfiniteAutoScrollComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
