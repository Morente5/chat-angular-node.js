export class User {
  name: string;
  avatar;
  status: string;

  constructor(name, avatar = '', status = '') {
    this.name = name;
    this.avatar = avatar;
    this.status = status;
  }

  logout() {}
}
