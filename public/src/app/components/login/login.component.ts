import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './../../services/login.service';
import { ChannelsComponent } from './../channels/channels.component';
import { User } from './../../model/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inputUsername: string;
  nameError: boolean;
  constructor(
    private loginService: LoginService
  ) {
    this.loginService.getErrorObs().subscribe( nameError => this.nameError = nameError );
  }

  ngOnInit() {
  }

  loginBtn() {
    if (this.inputUsername.trim()) {
      const tempUser = new User(this.inputUsername.trim());
      if (!this.loginService.chosen(tempUser)) {
        this.loginService.login(tempUser);
      }
    }
  }

}
