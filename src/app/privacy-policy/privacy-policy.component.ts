import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrivacyService } from './../services/privacy.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss', './privacy-policy.mobile.scss']
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
