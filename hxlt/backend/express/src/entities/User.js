import encrypt from '../lib/encrypt';

export default class User {
  static index = 0;

  constructor(name, password, role) {
    this.id = User.index;
    this.name = name;
    this.password = encrypt(password);
    this.role = role ? role : 'user';
    User.index += 1;
    this.getName = this.getName.bind(this);
    this.getRole = this.getRole.bind(this);
    this.isGuest = this.isGuest.bind(this);
  }

  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }

  getRole() {
    return this.role;
  }

  setRole(role) {
    this.role = role;
  }

  isGuest() {
    return this.role === 'guest';
  }
}
