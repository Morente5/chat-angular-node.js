import { Component, OnInit } from '@angular/core';

declare var $: any;

import { User } from './model/user';
import { SocketService } from './services/socket.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class WindowComponent {
  loggedIn: boolean;
  ready: boolean = false;
  notification: string = '';

  constructor(
    private socketService: SocketService,
    private loginService: LoginService
  ) {
    this.socketService.subjectLoggedIn.subscribe(logged => this.loggedIn = logged);
    this.socketService.subjectReady.subscribe(ready => this.ready = ready);
    this.socketService.subjectMessage.subscribe(message => {
      $('chat-messages').animate({ scrollTop: $('chat-messages').prop('scrollHeight')}, 300);
    });
    this.socketService.subjectUserNotif.subscribe(notif => {
      this.notification = notif;
      if (this.loggedIn) {
        $('#notif').show('slow');
        window.setTimeout(() => $('#notif').hide('slow'), 6000);
      }
    });

  }

  ngOnInit() {
    this.loginService.loadLogin();
  }

}
