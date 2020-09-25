import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/share/services/notification.service';
import { NotificationVitaminedService } from 'src/app/share/services/notification-vitamined.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {

  constructor(
    private notificationService: NotificationService,
    private notificationServiceVit: NotificationVitaminedService
  ) { }

  ngOnInit() {
    this.notificationServiceVit.getMessagesVitamined().subscribe(data => {
      console.log('AppContact notified:' + data);
    });
    this.notificationService.notify('Hola desde contact');
  }

}
