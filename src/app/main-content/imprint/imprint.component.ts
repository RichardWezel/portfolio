// src/app/imprint/imprint.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImprintService } from './../../services/imprint.service'; // Passe den Pfad entsprechend an
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit, OnDestroy {
  isVisible = false; // Interne Variable zur Steuerung der Sichtbarkeit
  private subscription!: Subscription;

  constructor(private imprintService: ImprintService) {}

  ngOnInit() {
    // Abonniere das Observable, um Änderungen im Sichtbarkeitsstatus zu erhalten
    this.subscription = this.imprintService.isVisible$.subscribe(
      visible => this.isVisible = visible
    );
  }

  ngOnDestroy() {
    // Vermeide Memory Leaks durch das Unsubscriben beim Zerstören der Komponente
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Methode zum Schließen des Imprint
  closeImprint() {
    this.imprintService.hide();
  }
}
