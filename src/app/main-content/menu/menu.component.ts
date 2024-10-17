import { Component } from '@angular/core';
import { LanguageSwitchBtnComponent } from "../../shared/components/language-switch-btn/language-switch-btn.component";
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [LanguageSwitchBtnComponent, SharedModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {}