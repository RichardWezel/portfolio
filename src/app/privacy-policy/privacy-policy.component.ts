import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrivacyService } from './../services/privacy.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy{
  isVisible = false; 
  private subscription!: Subscription;

  constructor(private privacyService: PrivacyService) {}

  ngOnInit() {
    this.subscription = this.privacyService.isVisible$.subscribe(
      visible => this.isVisible = visible
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closePrivacyPolicy() {
    this.privacyService.hide();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (this.isVisible) {
      this.closePrivacyPolicy();
    }
  }
}
