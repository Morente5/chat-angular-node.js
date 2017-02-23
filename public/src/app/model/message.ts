import { User } from './user';
import { Channel } from './channel';

export class Message {
  author: User;
  channel: Channel;
  isRead: boolean;
  sentAt: Date;
  text: string;
  first: boolean;

  constructor(author: User, text: string, channel: Channel, first: boolean = false) {
    this.author = author;
    this.channel = channel;
    this.isRead = false;
    this.sentAt = new Date();
    this.text = text;
    this.first = first;
  }

  isFrom(user: User) {
    return user.name === this.author.name;
  }
}
