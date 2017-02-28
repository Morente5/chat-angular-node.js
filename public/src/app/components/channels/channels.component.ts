import { Component, OnInit } from '@angular/core';

import { LoginService } from './../../services/login.service';
import { ChannelsService } from './../../services/channels.service';
import { SocketService } from './../../services/socket.service';

import { Channel } from '../../model/channel';
import { User } from '../../model/user';

@Component({
  selector: 'channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  channels: Array<Channel> = [];
  showChannels: Array<Channel> = [];
  selectedChannel: Channel;

  loggedUser: User;
  messages;

  constructor(
    private loginService: LoginService,
    private channelsService: ChannelsService,
    private socketService: SocketService
  ) {
    this.socketService.subjectCurrentUser.subscribe(user => this.loggedUser = user);

    this.socketService.subjectChannels.subscribe(channels => {
      this.channels = channels;
      this.showChannels = this.channels.map(channel => {
        channel['showname'] = channel.priv ? `@${channel.user.name}` : `#${channel.id}`;
        return channel;
      });
    });

    this.channelsService.subjectSelectedChannel.subscribe(channel => {
      this.selectedChannel = channel;
      if (this.messages && this.messages[channel.id] && this.loggedUser) {
        this.messages[channel.id].forEach(msg => msg.isRead = true);
      }
    });

    this.channelsService.subjectMessages.subscribe(messages => {
      this.messages = messages;
      if (this.messages && this.messages[this.selectedChannel.id] && this.loggedUser) {
        this.messages[this.selectedChannel.id].forEach(msg => msg.isRead = true);
      }
    });
  }

  ngOnInit() {
    //this.enterChannel(this.channels[0]);
  }

  enterChannel(channel) {
    this.channelsService.enterChannel(channel);
  }

  isSelected(channel) {
    return channel.id === this.selectedChannel.id;
  }

  noRead(channel) {
    return (this.messages[channel.id] && !this.isSelected(channel)) ?
      this.messages[channel.id].reduce((noread, msg) => msg.isRead ? noread : ++noread, 0) : 0;
  }

}
