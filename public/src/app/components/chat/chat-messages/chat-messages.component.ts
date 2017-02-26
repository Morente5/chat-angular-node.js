import { Component, OnInit } from '@angular/core';
import { Channel } from '../../../model/channel';
import { Message } from '../../../model/message';
import { User } from '../../../model/user';

import { ChannelsService } from './../../../services/channels.service';
import { SocketService } from './../../../services/socket.service';


@Component({
  selector: 'chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {
  messages: Object;
  selectedChannel: Channel;
  loggedUser: User;
  constructor(
    private channelsService: ChannelsService,
    private socketService: SocketService
  ) {
    this.channelsService.subjectMessages.subscribe(messages => this.messages = messages);
    this.channelsService.subjectSelectedChannel.subscribe(channel => this.selectedChannel = channel);
    this.socketService.subjectCurrentUser.subscribe(user => this.loggedUser = user);
  }

  ngOnInit() {
  }

  isMine(message: Message) {
    return this.loggedUser.name === message.author.name;
  }

}
