import Express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import exphbs from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';

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


let posts = [
  new Post('hello', 'how are your?'),
  new Post('nodejs', 'story about nodejs'),
];


app.get('/', (req, res) => {
  res.send('<a href="posts">Go Post</a>');
});

app.get('/posts', (req, res) => {
  res.render('posts/index', {
    data: { posts },
    helpers: postsIndexHelpers,
  });
});

app.get('/posts/show/:id', (req, res) => {
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
    res.redirect(`/posts/show/${post.id}`);
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

export default app;
