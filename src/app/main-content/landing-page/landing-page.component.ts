import { Component } from '@angular/core';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { InfiniteAutoScrollComponent } from "./infinite-auto-scroll/infinite-auto-scroll.component";
import { SharedModule } from '../../shared/shared.module';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavBarComponent, InfiniteAutoScrollComponent, SharedModule, RouterOutlet],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', './landing-page.mobile.scss']
})
export class LandingPageComponent {

}
