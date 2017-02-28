import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as io from 'socket.io-client';

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
  ready: boolean;

  subjectChannels: BehaviorSubject<Array<Channel>> = new BehaviorSubject<Array<Channel>>([]);
  subjectTyping: BehaviorSubject<Array<Channel>> = new BehaviorSubject<Array<Channel>>([]);
  subjectUsers: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);
  subjectVideo: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);


  subjectCurrentUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User(''));
  subjectLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  subjectReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  subjectMessage: BehaviorSubject<any> = new BehaviorSubject<any>('');
  subjectUserNotif: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() {

    this.subjectChannels.subscribe(channels => this.channels = channels);
    this.subjectUsers.subscribe(users => this.users = users);
    this.subjectCurrentUser.subscribe(usr => this.loggedUser = usr);
    this.subjectLoggedIn.subscribe(log => this.loggedIn = log);
    this.subjectReady.subscribe(ready => this.ready = ready);

    this.socket = io();
    this.delivery = new Delivery(this.socket);

    this.socket.on('load', (channels, users) => {
      this.load(channels, users);
    });

    this.socket.on('logged-in', user => {
      const tempUser = new User(user.name, user.avatar, user.status, user.id);
      this.subjectCurrentUser.next(tempUser);
      this.subjectLoggedIn.next(true);
    });

    this.socket.on('message', message => {
      const tempMessage = new Message(message.author, message.channel, message.type, message.text, message.first, message.path || '');
      this.subjectMessage.next(tempMessage);
    });

    this.socket.on('typing', (user, channel) => {
      const chnID = channel.priv ? user.id : channel.id;
      this.channels[this.channels.findIndex(
        chn => chnID === chn.id)].typing.push(new User(user.name, user.avatar, user.status, user.id));
      this.subjectTyping.next(this.channels);
    });

    this.socket.on('stop-typing', (user, channel) => {
      const chnID = channel.priv ? user.id : channel.id;
      const i = this.channels.findIndex(chn => chnID === chn.id)
      const j = this.channels[i].typing.findIndex(usr => user.id === usr.id);
      this.channels[i].typing.splice(j, 1);
      this.subjectTyping.next(this.channels);
    });

    this.delivery.on('send.success', function (fileUID) {
      console.log('file was successfully sent.');
    });

    this.delivery.on('receive.start', function (fileUID) {
      console.log('receiving a file!');
    });

    this.socket.on('video', (image, user, channel) => {
      if (this.loggedIn && this.loggedUser.id && this.ready) {
        const chnID = channel.priv ? user.id : channel.id;
        this.channels[this.channels.findIndex(
          chn => chnID === chn.id)].video[user.id] = image;
        this.subjectVideo.next(this.channels);
      }
    });
    this.socket.on('stvideo', user => {
      this.channels.forEach(channel => {
        delete channel.video[user.id];
      });
    });

    this.socket.on('userloggedin', user => {
      this.subjectUserNotif.next(user.name + ' logged in');
    });
    this.socket.on('userloggedout', user => {
      this.subjectUserNotif.next(user.name + ' logged out');
    });

    this.socket.on('loadAv', (user, path) => {
      this.users.find(usr => usr.id === user.id).avatar = path;
      this.subjectUsers.next(this.users);
      console.log(this.users);
    });

    this.subjectUsers.subscribe(users => {
      if (this.loggedIn && this.loggedUser.id && this.ready && this.channels.length !== 0 && this.users.length !== 0) {
        this.channels.forEach(channel => {
          let user = this.users.find(usr => usr.id === channel.id);
          if (user) {
            this.channels.find(chn => chn.id === user.id).avatar = user.avatar;
          }
        });
        this.subjectChannels.next(this.channels);

        this.loggedUser.avatar = this.users.find(user => user.id === this.loggedUser.id).avatar;
        this.subjectCurrentUser.next(this.loggedUser);
      }
    });

    window.setTimeout(() => this.subjectReady.next(true), 800);
  }

  load(channels = this.channels, users = this.users) {
    const tempPublicChannels = channels
      .map(channel => new Channel(channel.priv, channel.description, channel.id, new User(''), '/assets/avatars/chat.png'));
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
    }
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

  sendVideo(image, channel: Channel) {
    this.socket.emit('sendVideo', image, this.loggedUser, channel);
  }
  stopVideo() {
    this.socket.emit('stopVideo', this.loggedUser);
  }

  sendFile(file, channel: Channel) {
    this.delivery.send(file, { user: this.loggedUser, channel: channel, type: 'message' });
  }
  sendAvatar(file) {
    console.log(file);
    this.delivery.send(file, { user: this.loggedUser, type: 'avatar' });
  }
}
