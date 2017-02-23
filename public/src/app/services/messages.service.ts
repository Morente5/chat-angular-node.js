import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { Channel } from '../model/channel';
import { Message } from '../model/message';

@Injectable()
export class MessagesService {

  constructor() { }

  /*
  sendMsg() {
    console.log(this.messageText);
    const tempMessage = this.messageText.trim();
    if (tempMessage) {
      this.socket.emit('message', {
        'user': this.username,
        'text': tempMessage,
        'first': this.messages.length === 0 || this.username !== this.messages.slice(-1).pop().user
      });
    }
    this.messageText = '';
  }
  
  this.socket.on('message', msg => {
    console.log(this.messages);
    this.messages.push(msg);
    console.log(this.messages);
  });
  */

}
