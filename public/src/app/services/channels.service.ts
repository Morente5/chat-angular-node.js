import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './login.service';

import { Channel } from '../model/channel';
import { Message } from '../model/message';
import { User } from '../model/user';

@Injectable()
export class ChannelsService {
  messages: Object;
  channels: Array<Channel>;
  selectedChannel: Channel;
  subjectSelectedChannel: BehaviorSubject<Channel> = new BehaviorSubject<Channel>(new Channel([new User(''), new User('')], false, ''));
  constructor(
    private loginService: LoginService
  ) {
    this.loginService.availableChannelsObs().subscribe(chnls => this.channels = chnls);
    this.selectedChannelObs().subscribe(channel => this.selectedChannel = channel);

  }

  enterChannel(channel: Channel) {
    console.log(channel);
    this.loginService.enterChannel(channel);

    //this.loginService.socket.on('loadmsgs', messages => this.messages[channel.id] = messages);
    this.subjectSelectedChannel.next(channel);
  }

  // Observables

  selectedChannelObs() {
    return this.subjectSelectedChannel.asObservable();
  }
}
