import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-career-teaser',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './career-teaser.component.html',
  styleUrls: ['./career-teaser.component.scss', './career-teaser.mobile.scss']
})
export class CareerTeaserComponent {}
