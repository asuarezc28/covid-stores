import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationVitaminedService {
  // message: string = undefined;
  observer = new BehaviorSubject<string>('');

  constructor(
    private notificationService: NotificationService
  ) {
    this.notificationService.getMessages().subscribe(data => {
    });
  }

  getMessagesVitamined(): Observable<string> {
    return this.observer.asObservable();
  }
}
