import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoadingService {
  constructor() {}

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private progressSubject = new BehaviorSubject<number>(0);

  loading$ = this.loadingSubject.asObservable();
  progress$ = this.progressSubject.asObservable();

  loadingOn() {
    this.loadingSubject.next(true);
    this.progressSubject.next(0);
  }

  loadingOff() {
    this.loadingSubject.next(false);
    this.progressSubject.next(0);
  }

  setProgress(progress: number) {
    const safeProgress = Math.max(0, Math.min(100, progress));
    this.progressSubject.next(safeProgress);
  }
}
