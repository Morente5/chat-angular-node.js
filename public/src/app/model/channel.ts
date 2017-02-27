import { User } from './user';

export class Channel {
  id: string;
  priv: boolean;
  description: string;
  user: User;
  avatar;
  typing = [];
  video = {};

  constructor(priv: boolean = true, description?: string, id?: string, user?: User, avatar?, typing = [], video = {}) {
    this.priv = priv;
    this.id = priv ? user.id : id;
    this.user = priv ? user : null;
    this.description = priv ? user.status : description;
    this.avatar = avatar;
    this.typing = typing;
    this.video = video;
  }

}
