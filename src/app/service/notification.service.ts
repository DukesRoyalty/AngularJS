import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showNotification(title: string, body: string, onClickFn: (this: Notification, ev: Event) => any = () => {}): void {
    const options = {
      icon: '',
      body: body
    };

    const notification = new Notification(title, options);

    notification.onclick = onClickFn;
  }
}
