import { Component, OnInit, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './../../services/login.service';
import { User } from './../../model/user';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User('hola');
  nombre = 'hola';
  logged: boolean;

  constructor(private loginService: LoginService, private zone: NgZone) {

    this.loginService.currentUserObs().subscribe( user => {
      console.log(user.name);
      this.user = user;
      //this.nombre = user.name;
      this.zone.run( () => this.nombre = user.name );
    } );

    this.loginService.loggedInObs().subscribe(log => {
      this.logged = log;
    });

   }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
  }

}
