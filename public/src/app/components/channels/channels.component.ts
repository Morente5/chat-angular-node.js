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

}
