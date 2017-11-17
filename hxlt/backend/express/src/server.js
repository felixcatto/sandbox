import Express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import exphbs from 'express-handlebars';
import path from 'path';

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

let posts = [
  new Post('hello', 'how are your?'),
  new Post('nodejs', 'story about nodejs'),
];

app.get('/', (req, res) => {
  res.render('posts/index', {
    data: { posts },
    helpers: postsIndexHelpers,
  });
});


export default app;
