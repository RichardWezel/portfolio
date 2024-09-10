import { Component, OnInit, inject } from '@angular/core';
import projectsData from './projects.json'; 

interface Project {
  number: String;
  title: String;
  description: String;
  skills: any;
  next: number;
  img: String
}


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  projectId: any = 0;

  projectVisible: boolean = false;
  projects: Project[] = projectsData;  

  showProject(projectId: Number) {
    this.projectVisible = true;
    this.projectId = projectId
  }

  hideProject() {
    this.projectVisible = false;
  }

  nextProject(projectId: any) {
    this.projectId = projectId;
  }

}
    
