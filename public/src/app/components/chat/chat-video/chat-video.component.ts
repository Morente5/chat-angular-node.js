import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { ChannelsService } from './../../../services/channels.service';
import { SocketService } from './../../../services/socket.service';

import { Channel } from './../../../model/channel';

declare var $;

@Component({
  selector: 'chat-video',
  templateUrl: './chat-video.component.html',
  styleUrls: ['./chat-video.component.css']
})
export class ChatVideoComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('video') video: ElementRef;
  channels: Array<Channel>;
  videoCh: Array<Channel>;
  selectedChannel: Channel;
  videoImgs = {};
  videosrc: string;
  videoInterval = 0;
  context;
  isStreaming: boolean = false;
  loggedIn: boolean;
  media;
  stream;
  constructor(
    private socketService: SocketService,
    private channelsService: ChannelsService
  ) {
    this.socketService.subjectChannels.subscribe(channels => {
      this.channels = channels;
    });
    this.socketService.subjectLoggedIn.subscribe(log => {
      this.loggedIn = log;
    });


    this.socketService.subjectVideo.subscribe(channels => {
      this.videoCh = channels;
      if (channels.length !== 0) {
        channels.forEach((channel) => {
          this.videoImgs[channel.id] = channel.video;
        });
      }

    });


    this.channelsService.subjectSelectedChannel.subscribe(channel => {
      this.selectedChannel = channel;
      if (this.videoInterval) {
        this.stopVideo();
      }
    });

    this.channelsService.subjectVideo.subscribe(value => {
      if (this.channelsService.loggedUser.id && this.channelsService.selectedChannel.id) {
        console.log(value);
        if (value) {
          this.sendVideo();
        } else {
          this.stopVideo();
        }
      }
    });

  }

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext('2d');

    this.context.height = 150;
    this.context.width = 200;

  }

  sendVideo() {
    console.log('sending');
    this.isStreaming = true;


    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
      this.stream = stream;
      this.video.nativeElement.muted = true;
      this.video.nativeElement.src = window.URL.createObjectURL(stream);
    });

    this.video.nativeElement.play();

    this.videoInterval = window.setInterval(() => {
      this.context.drawImage(this.video.nativeElement, 0, 0, 200, 150);
      this.channelsService.sendVideo(this.canvas.nativeElement.toDataURL('image/webp'));
    }, 100);
  }

  stopVideo() {
    if (this.isStreaming && this.loggedIn) {
      console.log('stopping');
      this.video.nativeElement.src = null;
      this.video.nativeElement.pause();
      this.stream.getVideoTracks().forEach(track => track.stop());
      this.stream.getAudioTracks().forEach(track => track.stop());

      this.isStreaming = false;

      window.clearTimeout(this.videoInterval);
      this.videoInterval = 0;

      this.channelsService.stopVideo();
    }
  }

  channelsID() {
    return Object.keys(this.videoImgs[this.selectedChannel.id]);
  }

  searchChannel(id) {
    return this.channels[this.channels.findIndex(chn => id === chn.id)];
  }

}
