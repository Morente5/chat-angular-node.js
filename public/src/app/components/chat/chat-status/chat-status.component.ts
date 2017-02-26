import { Component, OnInit } from '@angular/core';

import { SocketService } from './../../../services/socket.service';
import { ChannelsService } from './../../../services/channels.service';

import { Channel } from './../../../model/channel';

@Component({
  selector: 'chat-status',
  templateUrl: './chat-status.component.html',
  styleUrls: ['./chat-status.component.css']
})
export class ChatStatusComponent implements OnInit {
  channels: Array<Channel> = [];
  typing: Array<Channel> = [];
  channelShowName: string = '';
  statusMsg: string = '';
  selectedChannel: Channel;
  typingMsgs = {};
  constructor(
    private channelsService: ChannelsService,
    private socketService: SocketService
  ) {
    this.socketService.subjectChannels.subscribe(channels => {
      this.channels = channels;
    });


    this.socketService.subjectTyping.subscribe(channels => {
      this.typing = channels;
      if (channels.length !== 0) {
        channels.forEach((channel) => {
          this.typingMsgs[channel.id] = channel.typing;
        });
      }

    });


    this.channelsService.subjectSelectedChannel.subscribe(channel => {
      if (channel) {
        this.channelShowName = channel.priv ? `@${channel.user.name}` : `#${channel.id}`;
        this.selectedChannel = channel;
      }
    });
  }

  ngOnInit() {
  }

}
