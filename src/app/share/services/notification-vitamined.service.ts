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
      console.log('Evento capturado por servico vitaminado: ' + data)
      this.observer.next(data + ' molando mas.');
    });
  }

  getMessagesVitamined(): Observable<string> {
    return this.observer.asObservable();
  }
}
