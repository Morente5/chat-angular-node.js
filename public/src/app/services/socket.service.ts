import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as io from 'socket.io-client';
//import { Delivery } from 'delivery';
//import 'jquery';
declare var $;
declare var Delivery;

import { User } from '../model/user';
import { Channel } from '../model/channel';
import { Message } from '../model/message';

@Injectable()
export class SocketService {
  socket: SocketIOClient.Socket;
  delivery;

  channels: Array<Channel>;
  users: Array<User>;
  loggedUser: User;
  loggedIn: boolean;

  subjectChannels: BehaviorSubject<Array<Channel>> = new BehaviorSubject<Array<Channel>>([]);
  subjectTyping: BehaviorSubject<Array<Channel>> = new BehaviorSubject<Array<Channel>>([]);
  subjectUsers: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);

  subjectCurrentUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User(''));
  subjectLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  subjectReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  subjectMessage: BehaviorSubject<any> = new BehaviorSubject<any>('');
  constructor() {

    this.subjectChannels.subscribe(channels => this.channels = channels);
    this.subjectUsers.subscribe(users => this.users = users);
    this.subjectCurrentUser.subscribe(usr => this.loggedUser = usr);
    this.subjectLoggedIn.subscribe(log => this.loggedIn = log);

    this.socket = io();
      this.delivery = new Delivery(this.socket);

    this.socket.on('load', (channels, users) => {
      const tempPublicChannels = channels
        .map(channel => new Channel(channel.priv, channel.description, channel.id, new User(''), 'chat.png'));
      const tempUsers = users.map(user => new User(user.name, user.avatar, user.status, user.id));

      if (this.loggedIn) {
        let tempPrivateChannels: Array<Channel> = [];
        users.forEach(user => {
          if (user.name !== this.loggedUser.name) {
            tempPrivateChannels.push(new Channel(true, user.status, user.name, user, user.avatar));
          }
        });

        this.subjectUsers.next(tempUsers);
        this.subjectChannels.next(tempPublicChannels.concat(tempPrivateChannels));
        this.subjectReady.next(true);
      }
    });
    this.socket.on('logged-in', user => {
      const tempUser = new User(user.name, user.avatar, user.status, user.id);
      this.subjectCurrentUser.next(tempUser);
      this.subjectLoggedIn.next(true);
    });

    this.socket.on('message', message => {
      const tempMessage = new Message(message.author, message.channel, message.text, message.first);
      this.subjectMessage.next(tempMessage);
    });

    this.socket.on('typing', (user, channel) => {
      const chnID = channel.priv ? user.id : channel.id;
      this.channels[this.channels.findIndex(
        chn => chnID === chn.id)].typing.push(new User(user.name, user.avatar, user.status, user.id));
      console.log(this.channels[this.channels.findIndex( chn => chnID === chn.id)]);
      this.subjectTyping.next(this.channels);
    });

    this.socket.on('stop-typing', (user, channel) => {
      const chnID = channel.priv ? user.id : channel.id;
      const i = this.channels.findIndex(chn => chnID === chn.id)
      const j = this.channels[i].typing.findIndex(usr => user.id === usr.id);
      this.channels[i].typing.splice(j, 1);
      this.subjectTyping.next(this.channels);
      console.log('stoptyping', user, this.channels.find(chn => chnID === chn.id));
    });

    this.delivery.on('delivery.connect', delivery => {
      $('input[type=submit]').click(function(evt){
        let file = $('input[type=file]')[0].files[0];
        //let extraParams = {foo: 'bar'};
        delivery.send(file/*, extraParams*/);
        evt.preventDefault();
      });
    });
 
    this.delivery.on('send.success',function(fileUID){
      console.log('file was successfully sent.');
    });

    this.delivery.on('receive.start',function(fileUID){
      console.log('receiving a file!');
    });
 
    this.delivery.on('receive.success',function(file){
      let params = file.params;
      if (file.isImage()) {
        $('img').attr('src', file.dataURL());
      };
    });

  }

  login(user: User) {
    this.socket.emit('login', user);
  }

  logout() {
    this.socket.emit('logout');
    this.subjectLoggedIn.next(false);
    this.subjectCurrentUser.next(null);
  }

  sendMsg(message: Message) {
    this.socket.emit('sendMessage', message);
  }

  typing(channel: Channel) {
    this.socket.emit('sendTyping', this.loggedUser, channel);
  }
  stopTyping(channel: Channel) {
    this.socket.emit('sendStopTyping', this.loggedUser, channel);
  }
}
