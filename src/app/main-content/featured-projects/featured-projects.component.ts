import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss'
})
export class FeaturedProjectsComponent {

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
