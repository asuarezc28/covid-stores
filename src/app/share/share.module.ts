import { NotificationService } from './services/notification.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NotificationService
  ],
  imports: [
    CommonModule
  ],
  providers: [
    NotificationService
  ]
})
export class ShareModule { }
