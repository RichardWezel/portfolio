import { Component} from '@angular/core';
import projectsData  from './projects.json'; 
import { SharedModule } from '../../../shared/shared.module';

interface Skill {
  name: string;
  iconPath: string;
}

interface Links {
  github: string;
  live: string;
}

interface Project {
  number: string;
  title: string;
  description: string;
  skills: Skill[];
  next: number;
  img: string;
  links: Links;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SharedModule],
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
    
