import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ArrowBtnComponent } from './components/arrow-btn/arrow-btn.component';
import { ProjectLinkIconComponent } from './components/project-link-icon/project-link-icon.component';

@NgModule({
  imports: [TranslateModule, CommonModule, ArrowBtnComponent, ProjectLinkIconComponent],
  exports: [TranslateModule, ArrowBtnComponent, ProjectLinkIconComponent]
})
export class SharedModule {}