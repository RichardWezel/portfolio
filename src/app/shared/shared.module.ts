import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ArrowBtnComponent } from './components/arrow-btn/arrow-btn.component';

@NgModule({
 
  imports: [TranslateModule, CommonModule, ArrowBtnComponent],
  exports: [TranslateModule, ArrowBtnComponent]
})
export class SharedModule {}