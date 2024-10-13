// src/app/services/imprint.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Macht den Service als Singleton verfügbar
})
export class ImprintService {
  // BehaviorSubject hält den aktuellen Sichtbarkeitsstatus
  private _isVisible = new BehaviorSubject<boolean>(false);
  isVisible$ = this._isVisible.asObservable(); // Observable für andere Komponenten

  // Methode zum Anzeigen des Imprint
  show() {
    this._isVisible.next(true);
  }

  // Methode zum Verbergen des Imprint
  hide() {
    this._isVisible.next(false);
  }
}
