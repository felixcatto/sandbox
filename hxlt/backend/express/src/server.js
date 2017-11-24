import Express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import exphbs from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import uaParser from 'ua-parser-js';

import Post from './entities/Post';
import postsIndexHelpers from './views/posts/index';


const app = new Express();
app.use(morgan('dev'));

const viewsFolder = path.join(__dirname, 'views');
app.set('views', viewsFolder);
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(viewsFolder, 'layouts'),
  partialsDir: [
    path.join(viewsFolder, 'posts/partials'),
  ],
  extname: '.hbs',
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

let posts = [
  new Post('hello', 'how are your?'),
  new Post('nodejs', 'story about nodejs'),
];



app.get('/', (req, res) => {
  res.send('<a href="posts">Go Post</a><br><a href="agent">See Agent info</a>');
});

app.get('/agent', (req, res) => {
  const useragent = JSON.stringify(req.useragent, null, 2);
  res.send(`<pre>${useragent}</pre>`);
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
