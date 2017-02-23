import { Component, OnInit } from '@angular/core';
import { Channel } from '../../model/channel';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  channels: Array<Channel> = [];
  showchannels: Array<Channel> = [];

  constructor(private loginService: LoginService) {

    this.loginService.availableChannelsObs().subscribe( channels => {
      this.channels = channels;
      this.showchannels = this.channels.map(channel => {
        channel['showname'] = channel.id.replace(`@${this.loginService.currentUser.name}`, '');
        return channel;
      });
    });

  }

  ngOnInit() {
  }

}
