import { Component, OnInit } from '@angular/core';

import { SocketService } from './../../services/socket.service';
import { LoginService } from './../../services/login.service';

import { User } from './../../model/user';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User('');
  logged: boolean;

  constructor(
    private socketService: SocketService,
    private loginService: LoginService
  ) {

    this.socketService.subjectCurrentUser.subscribe( user => {
      this.user = user;
    } );

    this.socketService.subjectLoggedIn.subscribe(log => {
      this.logged = log;
    });

   }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
  }

}
