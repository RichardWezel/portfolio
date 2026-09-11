import { NgStyle } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [NgStyle, ProjectsComponent, SharedModule],
  templateUrl: './featured-projects.component.html',
  styleUrls: ['./featured-projects.component.scss', './featured-projects.mobile.scss']
})
export class FeaturedProjectsComponent {

  @ViewChild(ProjectsComponent) projectComponent?: ProjectsComponent;

  projectPreviews = [
    { id: 'join', img: 'assets/img/Join.svg', display: 'none' },
    { id: 'el-pollo-loco', img: 'assets/img/ElPolloLoco.svg', display: 'none' },
    { id: 'da-bubble', img: 'assets/img/DaBubble.svg', display: 'none' },
    { id: 'videoflix', img: 'assets/img/videoflix.png', display: 'none' }
  ];

  hoverIn(styleObj: any): void {
    styleObj.display = 'flex';
  }

  hoverOut(styleObj: any): void {
    styleObj.display = 'none';
  }
}