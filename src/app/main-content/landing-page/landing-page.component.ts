import { Component } from '@angular/core';
import { InfiniteAutoScrollComponent } from "./infinite-auto-scroll/infinite-auto-scroll.component";
import { SharedModule } from '../../shared/shared.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [InfiniteAutoScrollComponent, SharedModule, RouterOutlet, RouterLink, NavbarComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', './landing-page.mobile.scss']
})
export class LandingPageComponent {}