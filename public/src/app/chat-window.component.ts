import { Component, ElementRef, OnInit } from '@angular/core';

//import 'jquery';
declare var $:any;

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

  constructor(
    private socketService: SocketService,
    private loginService: LoginService,
    private elRef: ElementRef
  ) {
    this.socketService.subjectLoggedIn.subscribe(logged => this.loggedIn = logged);
    this.socketService.subjectReady.subscribe(ready => this.ready = ready);
    this.socketService.subjectMessage.subscribe(message => {  // TODO if message is in channel
      $('chat-messages').animate({ scrollTop: $('chat-messages').prop('scrollHeight')}, 300);
      //const objDiv = document.querySelector('.card-msg');
      //objDiv.scrollTop = objDiv.scrollHeight;
    });
  }

  ngOnInit() {
    this.loginService.loadLogin();
  }

}
