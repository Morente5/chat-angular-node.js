import { Component, OnInit } from '@angular/core';

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

  constructor(
    private socketService: SocketService,
    private loginService: LoginService
  ) {
    this.socketService.subjectLoggedIn.subscribe(logged => this.loggedIn = logged);
    this.socketService.subjectMessage.subscribe(message => {  // TODO if message is in channel
      //const objDiv = document.querySelector('.card-msg');
      //objDiv.scrollTop = objDiv.scrollHeight;
    });
  }

  ngOnInit() {
    this.loginService.loadLogin();
  }

}
