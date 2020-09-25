import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  observer = new BehaviorSubject<string>('');
  constructor() { }
  notify(messageToNotify: string) {
    this.observer.next(messageToNotify);
  }
  getMessages(): Observable<string> {
    return this.observer.asObservable()
  }
}
