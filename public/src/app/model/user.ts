export class User {
  name: string;
  avatar;
  status: string;
  id: string;

  constructor(name, avatar = '', status = '', id = '') {
    this.name = name;
    this.avatar = avatar;
    this.status = status;
    this.id = id;
  }

  logout() {}
}
