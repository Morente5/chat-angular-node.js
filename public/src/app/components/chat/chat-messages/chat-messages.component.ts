import { Component, OnInit } from '@angular/core';
import { Channel } from '../../../model/channel';
import { Message } from '../../../model/message';

@Component({
  selector: 'chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {
  messages: Array<Message> = [];
  constructor() { }

  ngOnInit() {
  }

}
