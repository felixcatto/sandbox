let postIndex = 0;

export default class Post {
  constructor(title, body) {
    this.id = postIndex;
    this.title = title;
    this.body = body;
    postIndex += 1;
  }

  getTitle() {
    return this.title;
  }

  getBody() {
    return this.body;
  }
}
