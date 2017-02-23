import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { LoginService } from './../../services/login.service';
import { ChannelsService } from './../../services/channels.service';

import { Channel } from '../../model/channel';

@Component({
  selector: 'channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css'],
  providers: [ChannelsService]
})
export class ChannelsComponent implements OnInit {
  channels: Array<Channel> = [];
  showChannels: Array<Channel> = [];
  selectedChannel: Channel;

  constructor(
    private loginService: LoginService,
    private channelsService: ChannelsService
  ) {
    this.loginService.availableChannelsObs().subscribe(channels => {
      console.log(channels);
      this.channels = channels;
      this.showChannels = this.channels.map(channel => {
        channel['showname'] = channel.id.replace(`@${this.loginService.currentUser.name}`, '');
        return channel;
      });
    });

    this.channelsService.selectedChannelObs().subscribe(channel => this.selectedChannel = channel);

  }

  ngOnInit() {

  }

  enterChannel(channel) {
    this.channelsService.enterChannel(channel);
  }

  isSelected(channel) {
    return channel.id === this.selectedChannel.id;
  }

}
