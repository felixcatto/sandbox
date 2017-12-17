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

import applyRouting from './routes/index';
import users from './DAL/users';
import User from './entities/User';
import { getUserByID } from './DAL/users';
import { createAdminRole } from './DAL/fixtures';


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

app.use('/', Express.static(path.join(__dirname, 'public')));

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

app.use(async (req, res, next) => {
  if (req.session.currentUserID) {
    const user = await getUserByID(req.session.currentUserID);
    if (!user) {
      res.locals.currentUser = new User(-1, 'Guest', '', 'guest');
    } else {
      res.locals.currentUser = user;
    }
  } else {
    res.locals.currentUser = new User(-1, 'Guest', '', 'guest');
  }
  next();
});

applyRouting(app);

createAdminRole();


export default app;
