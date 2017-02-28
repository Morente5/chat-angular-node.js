import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';

import { SocketService } from './socket.service';

import { User } from '../model/user';
import { Channel } from '../model/channel';

@Injectable()
export class LoginService {
  loggedUser: User;
  loggedIn: boolean;

  users: Array<User>;

  constructor(
    private ls: LocalStorageService,
    private socketService: SocketService
  ) {
    this.socketService.subjectCurrentUser.subscribe(usr => {
      if (usr && usr.name) {
        this.ls.set('user', usr);
      }
      this.loggedUser = usr;
    });
    this.socketService.subjectLoggedIn.subscribe(log => this.loggedIn = log);

    this.socketService.subjectUsers.subscribe(users => this.users = users);
  }

  loadLogin() {
    if (this.loggedUserLS() && !this.chosen(this.loggedUserLS(), this.users)) {
      this.login(this.loggedUserLS());
    }
  };

  login(user: User) {
    if (!this.chosen(user, this.users)) {
      this.ls.set('user', user);
      this.socketService.login(user);
    }
  }


  logout() {
    this.ls.clearAll();
    this.socketService.logout();
  }

  // Local Storage
  loggedUserLS(): User {
    if (this.ls.get('user') &&
      this.ls.get('user').hasOwnProperty('name') &&
      this.ls.get('user')['name'] !== '') {
      const userName = this.ls.get('user')['name'],
        userAvatar = this.ls.get('user')['avatar'],
        userStatus = this.ls.get('user')['status'];
      return new User(userName, userAvatar, userStatus);
    }
  }


  // Name chosen
  chosen(testUser: User, users: Array<User>) {
    if (testUser && testUser.name && users.length) {
      return users.findIndex(usr => usr.name === testUser.name) !== -1;
    }
  }

}
