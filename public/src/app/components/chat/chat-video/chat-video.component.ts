import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'chat-video',
  templateUrl: './chat-video.component.html',
  styleUrls: ['./chat-video.component.css']
})
export class ChatVideoComponent implements OnInit {
  @ViewChild('view') canvas: any;
  @ViewChild('video') video: any;
  videosrc: string;
  constructor(
    private elementRef: ElementRef
  ) {

  }

  ngOnInit() {
    navigator.getUserMedia({audio: true, video: true}, this.successCallback, this.errorCallback);
  }

  successCallback(stream) {
    this.videosrc = window.URL.createObjectURL(stream);
    this.video.nativeElement.play();
  }

  errorCallback(err) {
    console.log('Ocurrió el siguiente error: ' + err.name);
  }

}
