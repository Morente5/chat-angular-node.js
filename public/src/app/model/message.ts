import { User } from './user';
import { Channel } from './channel';

export class Message {
  author: User;
  channel: Channel;
  isRead: boolean;
  sentAt: Date;
  type: string;
  text: string;
  path: string;
  first: boolean;

  constructor(author: User, channel: Channel, type: string, text: string, first: boolean = false, path: string = '') {
    this.author = author;
    this.channel = channel;
    this.isRead = false;
    this.sentAt = new Date();
    this.text = text;
    this.type = type || 'text';
    this.first = first;
    this.path = path;
  }

  isFrom(user: User) {
    return user.name === this.author.name;
  }
}
