import { User } from './user';
import { Message } from './message';

export class Channel {
  id: string;
  priv: boolean;
  users: Array<User>;
  avatar;
  messages: Array<Message>;

  constructor(users: Array<User>, priv: boolean = true, id?: string) {
    this.users = users;
    this.sortUsers();
    this.priv = priv;
    this.id = this.priv ? this.users.map( user => `@${user.name}` ).join('') : id;
    this.avatar = '';
    this.messages = [];
  }

  addUser(user: User) {
    if (!this.priv) {
      this.users.push(user);
      this.sortUsers();
    }
  }

  sortUsers() {
    this.users.sort( (a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) );
  }

  addMessage(author, text) {
    let msg;
    // if message is first
    if ( !this.messages.slice(-1)[0] || !this.messages.slice(-1)[0].isFrom(author) ) {
      msg = this.messages.push(new Message(author, text, this, true));
    } else {
      msg = this.messages.push(new Message(author, text, this));
    }
    this.messages.push(msg);
  }
}
