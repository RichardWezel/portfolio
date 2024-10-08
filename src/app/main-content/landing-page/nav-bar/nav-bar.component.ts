import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../../../app/shared/shared.module';
import { LanguageSwitchBtnComponent } from '../../../shared/components/language-switch-btn/language-switch-btn.component';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [SharedModule, LanguageSwitchBtnComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {}
