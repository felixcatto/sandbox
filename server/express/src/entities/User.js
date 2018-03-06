import encrypt from '../lib/encrypt';

export default class User {
  constructor(id, name, password, role) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.role = role;
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
