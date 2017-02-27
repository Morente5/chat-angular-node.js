import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SocketService } from './socket.service';

import { Channel } from '../model/channel';
import { Message } from '../model/message';
import { User } from '../model/user';

@Injectable()
export class ChannelsService {
  loggedUser: User;
  messages: Object = {};
  subjectMessages: BehaviorSubject<any> = new BehaviorSubject<any>(this.messages);
  channels: Array<Channel>;
  selectedChannel: Channel;
  subjectSelectedChannel: BehaviorSubject<any> = new BehaviorSubject<any>(new Channel(null, '', null, null));
  constructor(
    private socketService: SocketService
  ) {

    this.subjectMessages.subscribe(messages => this.messages = messages);
    this.socketService.subjectMessage.subscribe((message: Message) => {
      if (message) {
        const chnID = message.author.name !== this.loggedUser.name && message.channel.priv ? message.author.id : message.channel.id;
        if (!this.messages.hasOwnProperty(chnID)) {
          this.messages[chnID] = [];
        }
        message.first = !this.messages.hasOwnProperty(chnID) ||
                        this.messages[chnID].length === 0 ||
                        message.author.name !== this.messages[chnID].slice(-1).pop().author.name;
        this.messages[chnID].push(message);
        this.subjectMessages.next(this.messages);
      }
      //console.log('mensajes', this.messages);
    });

    this.socketService.subjectCurrentUser.subscribe(usr => this.loggedUser = usr);
    this.socketService.subjectChannels.subscribe(channels => this.channels = channels);
    this.subjectSelectedChannel.subscribe(chn => this.selectedChannel = chn);
  }

  enterChannel(channel: Channel) {
    this.subjectSelectedChannel.next(new Channel(channel.priv, channel.description, channel.id, channel.user, channel.avatar));
  }

  sendMsg(messageText) {
    let chnID = this.selectedChannel.id;
    let userName = this.loggedUser.name;
    let newMessage = new Message(
      this.loggedUser,
      this.selectedChannel,
      messageText
    );
    this.socketService.sendMsg(newMessage);
  }

  typing() {
    this.socketService.typing(this.selectedChannel);
  }

  stopTyping() {
    this.socketService.stopTyping(this.selectedChannel);
  }

}