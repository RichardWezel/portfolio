
import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss', './imprint.mobile.scss']
})
export class ImprintComponent  {}
