export default class Post {
  static index = 0;

  constructor(title, body) {
    this.id = Post.index;
    this.title = title;
    this.body = body;
    Post.index += 1;
  }

  getID() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  getBody() {
    return this.body;
  }

  setBody(body) {
    this.body = body;
  }
}
