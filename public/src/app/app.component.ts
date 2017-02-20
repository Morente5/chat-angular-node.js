import { Component, OnInit } from '@angular/core';

import * as io from 'socket.io-client';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageText = '';
  messages: Array<any> = [];
  tempUsername: string;
  connectedUsers: Array<any> = [];
  user = {};
  generalChannels: Array<any> = [
    { 'name': '#general', 'active': true }
  ];
  channels: Array<any> = [];
  socket: SocketIOClient.Socket;

  constructor(
    private ls: LocalStorageService
  ) {
    console.log(this.channels);
    this.logIn();

  }

  logInBtn() {
    if (this.tempUsername) {
      this.user = {
        'name': this.tempUsername.trim(),
        'image': '',
        'status': ''
      };
      this.setUser();
      this.logIn();
    }
  }

  logIn() {
    console.log(this.loggedUser(), this.isEmptyJSON(this.loggedUser()));
    if (!this.isEmptyJSON(this.loggedUser())) {
      this.user = this.loggedUser();
      if (this.connectedUsers.indexOf(this.user['name']) === -1) {

        this.connectedUsers.push(this.user['name']);  // TODO

        this.socket = io.connect().emit('userconn', this.user);
        console.log(this.socket);
        this.setUser();

        this.socket.on('connected', users => {  // Pasar solo 1?
          console.log(this.channels);
          this.channels = this.generalChannels.concat(users
            .map(function (user) { return { 'name': user.name, 'active': false }; })
            .filter(user => user.name !== this.user['name'])
          );
        });

        this.socket.on('message', msg => {
          console.log(this.messages);
          this.messages.push(msg);
          console.log(this.messages);
        });
      }
    }
  }


  setUser() {
    console.log(this.user);
    this.ls.set('user', this.user);

  }

  isEmptyJSON(obj) {
    for (let i in obj) { if (!!obj[i]) { return false; } }
    return true;
  }

  loggedUser() {
    return this.ls.get('user');
  }

  // onKeySendName(event) {
  //   if (event.target.value === 'enter') {
  //     this.logIn();
  //   }
  // }

  logOut() {
    this.ls.clearAll();
    this.socket.emit('disconn', JSON.parse(JSON.stringify(this.user)));
  }

  sendMsg() {
    if (this.loggedUser()) {
      console.log(this.messageText);
      const tempMessage = this.messageText.trim();
      if (tempMessage) {
        this.socket.emit('message', {
          'user': JSON.parse(JSON.stringify(this.user)),
          'text': this.messageText,
          'first': this.messages.length === 0 || JSON.stringify(this.user) !== JSON.stringify(this.messages.slice(-1).pop().user)
        });
      }
      this.messageText = '';
    }
  }

  isMine(message) {
    return JSON.stringify(message.user) === JSON.stringify(this.user);
  }

  isFirst(message) {
    return JSON.stringify(message.user) !== JSON.stringify(this.user);
  }

}
