import { User } from './user';

export class Channel {
  id: string;
  priv: boolean;
  user: User;
  avatar;
  typing = [];

  constructor(priv: boolean = true, id?: string, user?: User, avatar?, typing = []) {
    this.priv = priv;
    this.id = priv ? user.id : id;
    this.user = priv ? user : null;
    this.avatar = avatar;
    this.typing = typing;
  }

}
