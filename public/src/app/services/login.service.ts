import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';

import * as io from 'socket.io-client';

//import { ChannelsService } from './channels.service';

import { User } from '../model/user';
import { Channel } from '../model/channel';

@Injectable()
export class LoginService {
  currentUser: User;
  subjectCurrentUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User(''));

  channels: Array<Channel>;
  subjectChannels: BehaviorSubject<Array<Channel>> = new BehaviorSubject<Array<Channel>>([]);
  subjectUsers: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);

  users: Array<User> = [];
  tempUsername: string;

  subjectError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  socket: SocketIOClient.Socket;

  loggedIn: boolean;
  subjectLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private ls: LocalStorageService,
    //private channelsService: ChannelsService
  ) {
  }

  loadLogin() {
    this.availableChannelsObs().subscribe(chnls => this.channels = chnls);
    this.loggedUsersObs().subscribe(usrs => this.users = usrs);
    this.currentUserObs().subscribe(usr => this.currentUser = usr);
    this.loggedInObs().subscribe(log => this.loggedIn = log);

    this.socket = io();  // establish connection
    this.socket.on('load', (channels, users) => {  // On first connection
      this.subjectChannels.next(channels);
      this.subjectUsers.next(users);
      // Login
      if (this.loggedUserLS() && !this.chosen()) {  // If username stored in LS
        //this.subjectError.next(false);  // TO-DO
        this.login(this.loggedUserLS());
        this.load(channels, users);
      } else {
        console.log('si entras aqui malo.');
        this.logout();
        //this.subjectError.next(true);
      }
    });

  }

  login(user: User) {

    this.socket.on('update', (channels, users) => {
      this.load(channels, users);
    });

    this.setUserLS(user);
    this.subjectCurrentUser.next(user);
    this.subjectLoggedIn.next(true);
    this.socket.emit('loggedin', this.currentUser);
    //this.channelsService.enterChannel(this.channels[0]);
  }

  logout() {
    this.logoutLS();
    this.subjectLoggedIn.next(false);
    this.subjectCurrentUser.next(new User(''));
    this.socket.emit('loggedoff');
  }

  load(channels, users) {
    this.subjectChannels.next(channels);
    this.subjectUsers.next(users);

    let tempChannels = [];
    this.users.forEach(user => {
      if (user.name !== this.currentUser.name) {
        tempChannels.push(new Channel([this.currentUser, user]));
      }
    });
    this.subjectChannels.next(channels.concat(tempChannels));
    console.log(this.channels);
  }

  enterChannel(channel) {
    this.socket.emit('enterchannel', channel);
  }

  // Local Storage
  loggedUserLS(): User {
    if (this.ls.get('user') && this.ls.get('user')['name'] !== undefined && this.ls.get('user')['name'] !== '') {
      return new User(this.ls.get('user')['name'], this.ls.get('user')['avatar'], this.ls.get('user')['status']);
    }
  }

  setUserLS(user: User) {
    this.ls.set('user', user);
  }
  logoutLS() {
    this.ls.clearAll();
  }

  // Name chosen
  chosen(testUser: User = this.loggedUserLS()) {
    this.users.forEach(user => {
      if (user.name === testUser.name) {
        return true;
      }
    });
    return false;
  }

  // Observables
  currentUserObs(): Observable<User> {  // Current User
    return this.subjectCurrentUser.asObservable().share();
  }
  getErrorObs(): Observable<boolean> {  // Name error
    return this.subjectError.asObservable().share();
  }
  availableChannelsObs(): Observable<Array<Channel>> {  // Channels
    return this.subjectChannels.asObservable().share();
  }
  loggedUsersObs(): Observable<Array<User>> {  // Users
    return this.subjectUsers.asObservable().share();
  }
  loggedInObs(): Observable<boolean> {  // is logged in
    return this.subjectLoggedIn.asObservable().share();
  }


}
