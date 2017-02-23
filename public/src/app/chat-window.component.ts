import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { User } from './model/user';
import { LoginService } from './services/login.service';
/*
import * as io from 'socket.io-client';
import { LocalStorageService } from 'angular-2-local-storage';
*/
@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class WindowComponent {
  loggedIn: boolean;

  constructor(
    private loginService: LoginService
  ) {

    this.loginService.loggedInObs().subscribe(logged => this.loggedIn = logged);
    this.loginService.loadLogin();
  }

  ngOnInit() {
    this.loginService.loadLogin();
  }

}
