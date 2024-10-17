import { NgStyle } from '@angular/common';
import { Component, OnInit, inject, ViewChild } from '@angular/core';
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

  join = {
    display: 'none',
  };

  elPolloLoco = {
    display: 'none',
  };

  daBubble = {
    display: 'none',
  };

  hoverIn(styleObj: any): void {
    styleObj.display = 'flex';  
  }

  hoverOut(styleObj: any): void {
    styleObj.display = 'none'; 
  }
}