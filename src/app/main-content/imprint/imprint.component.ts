
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImprintService } from './../../services/imprint.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit, OnDestroy {
  isVisible = false; 
  private subscription!: Subscription;

  constructor(private imprintService: ImprintService) {}

  ngOnInit() {
    this.subscription = this.imprintService.isVisible$.subscribe(
      visible => this.isVisible = visible
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeImprint() {
    this.imprintService.hide();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (this.isVisible) {
      this.closeImprint();
    }
  }
}
