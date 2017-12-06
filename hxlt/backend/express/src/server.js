import Express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import exphbs from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import uaParser from 'ua-parser-js';
import session from 'express-session';
import cookieSession from 'cookie-session';

import encrypt from './lib/encrypt';
import Post from './entities/Post';
import User from './entities/User';
import postsIndexHelpers from './views/posts/index';


const app = new Express();
// app.use(morgan('dev'));

const viewsFolder = path.join(__dirname, 'views');
app.set('views', viewsFolder);
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(viewsFolder, 'layouts'),
  partialsDir: [
    path.join(viewsFolder, 'posts/partials'),
    path.join(viewsFolder, 'layouts/partials'),
  ],
  extname: '.hbs',
  helpers: {
    $eq(a, b) {
      return a === b;
    },
    $and(a, b) {
      return a && b;
    },
    $or(a, b) {
      return a || b;
    },
  },
}));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({ extended: true }));

const publicFolder = path.join(__dirname, 'public');
app.use('/', Express.static(publicFolder));

app.use(methodOverride('_method'));

app.use((req, res, next) => {
  req.useragent = uaParser(req.headers['user-agent']);
  next();
});

app.use(cookieSession({
  resave: false,
  saveUninitialized: false,
  secret: 'kura',
  cookie: {
    maxAge: 1000 * 60 * 60,
  },
}));

app.use((req, res, next) => {
  if (req.session.currentUserID) {
    const user = users.find(user => user.getID() === req.session.currentUserID);
    if (!user) {
      res.locals.currentUser = new User('Guest', '', 'guest');
    } else {
      res.locals.currentUser = user;
    }
  } else {
    res.locals.currentUser = new User('Guest', '', 'guest');
  }
  next();
});

let posts = [
  new Post('hello', 'how are your?'),
  new Post('nodejs', 'story about nodejs'),
];
let users = [];



app.get('/', (req, res) => {
  res.render('common/index');
});

app.get('/agent', (req, res) => {
  const useragent = JSON.stringify(req.useragent, null, 2);
  res.send(`<pre>${useragent}</pre>`);
});


app.get('/users', (req, res) => {
  res.render('users/list', {
    data: { users },
  });
});

app.get('/users/new', (req, res) => {
  res.render('users/new');
});

app.post('/users/new', (req, res) => {
  const { name, pass } = req.body;
  const errors = {};
  if (!name) {
    errors.title = 'Name Can\'t be blank';
  }

  if (!pass) {
    errors.body = 'Password Can\'t be blank';
  }

  if (Object.keys(errors).length === 0) {
    const user = new User(name, pass);
    users.push(user);
    req.session.currentUserID = user.getID();
    res.redirect('/posts');
    return;
  }

  res.status(422);
  res.render('users/new', {
    data: {
      form: req.body,
      errors,
    },
  });
});

app.get('/users/log-out', (req, res) => {
  req.session = null;
  res.redirect('/posts');
});

app.get('/users/log-in', (req, res) => {
  res.render('users/login');
});

app.post('/users/log-in', (req, res) => {
  const { name, pass } = req.body;
  const errors = {};
  const user = users
    .find(user => user.getName() === name && user.getPassword() === encrypt(pass));
  if (!user) {
    errors.error = 'Something going wrong';
  }

  if (Object.keys(errors).length === 0) {
    req.session.currentUserID = user.getID();
    res.redirect('/posts');
    return;
  }

  res.status(422);
  res.render('users/login', {
    data: {
      form: req.body,
      errors,
    },
  });
});

app.get('/posts', (req, res) => {
  res.render('posts/index', {
    data: { posts },
    helpers: postsIndexHelpers,
  });
});

app.get('/posts/:id/show', (req, res) => {
  const post = posts.find(post => post.id === +req.params.id);
  if (!post) res.send('This post don\'n exist');

  res.render('posts/show', {
    data: { post },
  });
});

app.get('/posts/new', (req, res) => {
  res.render('posts/new');
});

app.post('/posts/new', (req, res) => {
  const { title, body } = req.body;
  const errors = {};
  if (!title) {
    errors.title = 'Title Can\'t be blank';
  }

  if (!body) {
    errors.body = 'Body Can\'t be blank';
  }

  if (Object.keys(errors).length === 0) {
    const post = new Post(title, body);
    posts.push(post);
    res.redirect('/posts');
    return;
  }

  res.status(422);
  res.render('posts/new', {
    data: {
      form: req.body,
      errors,
    },
  });
});

app.delete('/posts/:id', (req, res) => {
  posts = posts.filter(post => post.id !== +req.params.id);
  res.redirect('/posts');
});

app.get('/posts/:id/edit', (req, res) => {
  const post = posts.find(post => post.id === +req.params.id);
  res.render('posts/edit', {
    data: {
      action: `/posts/${post.getID()}?_method=PUT`,
      form: {
        title: post.getTitle(),
        body: post.getBody(),
      },
    },
  });
});

app.put('/posts/:id', (req, res) => {
  const post = posts.find(post => post.id === +req.params.id);
  const { title, body } = req.body;
  const errors = {};
  if (!title) {
    errors.title = 'Title Can\'t be blank';
  }

  if (!body) {
    errors.body = 'Body Can\'t be blank';
  }

  if (Object.keys(errors).length === 0) {
    post.setTitle(title);
    post.setBody(body);
    res.redirect('/posts');
    return;
  }

  res.status(422);
  res.render('posts/edit', {
    data: {
      action: `/posts/${post.getID()}?_method=PUT`,
      form: req.body,
      errors,
    },
  });
});



export default app;
