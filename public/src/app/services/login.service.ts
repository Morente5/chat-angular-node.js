import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { Channel } from '../model/channel';
import { ChannelsComponent } from './../components/channels/channels.component';
// import { LoginComponent } from '../components/login/login.component';

import * as io from 'socket.io-client';
import { LocalStorageService } from 'angular-2-local-storage';
import { ChannelsService } from './channels.service';

@Injectable()
export class LoginService {
  currentUser: User;
  subjectCurrentUser: Subject<User> = new Subject<User>();

  channels: Array<Channel>;
  subjectChannels: Subject<Array<Channel>> = new Subject<Array<Channel>>();
  subjectUsers: Subject<Array<User>> = new Subject<Array<User>>();

  users: Array<User> = [];
  tempUsername: string;

  subjectError: Subject<boolean> = new Subject<boolean>();
  socket: SocketIOClient.Socket;

  loggedIn: boolean;
  subjectLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(
    private ls: LocalStorageService,
    private channelsService: ChannelsService
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
      if (this.loggedUserLS() && !this.chosen()) {  // Log in if username stored in LS and not already chosen
        this.subjectError.next(false);
        this.login(this.loggedUserLS());
        this.load(channels, users);
      } else {
        //this.subjectError.next(true);
        this.logout();
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
    // this.channelsService.enterChannel(this.channels[0]);
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

  // Observables
  currentUserObs(): Observable<User> {  // Current User
    return this.subjectCurrentUser.asObservable();
  }
  getErrorObs(): Observable<boolean> {  // Name error
    return this.subjectError.asObservable();
  }
  availableChannelsObs(): Observable<Array<Channel>> {  // Channels
    return this.subjectChannels.asObservable();
  }
  loggedUsersObs(): Observable<Array<User>> {  // Users
    return this.subjectUsers.asObservable();
  }
  loggedInObs(): Observable<boolean> {  // Users
    return this.subjectLoggedIn.asObservable();
  }

  // Local Storage
  loggedUserLS(): User {
    if (this.ls.get('user') && this.ls.get('user')['name'] !== undefined && this.ls.get('user')['name'] !== '') {
      return new User(this.ls.get('user')['name'], this.ls.get('user')['avatar'], this.ls.get('user')['status']);
    }
  }
  setUserLS(user: User) {
    this.ls.set('user', user);
    //console.log(user.name, 'added to LS');
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

}
