import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [SharedModule, RouterOutlet],
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.scss'
})
export class SkillSetComponent {

}
