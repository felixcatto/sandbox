export default class Post {
  static index = 0;

  constructor(title, body) {
    this.id = Post.index;
    this.title = title;
    this.body = body;
    Post.index += 1;
  }

  getTitle() {
    return this.title;
  }

  getBody() {
    return this.body;
  }
}
