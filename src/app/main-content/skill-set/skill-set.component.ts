import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [SharedModule, RouterOutlet],
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.scss', './skill-set.mobile.scss']
})
export class SkillSetComponent {

}
