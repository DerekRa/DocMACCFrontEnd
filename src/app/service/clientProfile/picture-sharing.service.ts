import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PictureSharingService {
  private pictureSubject = new BehaviorSubject<string>('');
  public picture$ = this.pictureSubject.asObservable();

  setPicture(picture: string): void {
    this.pictureSubject.next(picture);
  }

  getPicture(): Observable<string> {
    return this.picture$;
  }

  /**
   * Retrieve the current picture value without subscribing.
   */
  getCurrentValue(): string {
    return this.pictureSubject.value;
  }
}
