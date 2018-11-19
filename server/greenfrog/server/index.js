import Koa from 'koa';
import serve from 'koa-static';
import path from 'path';
import Pug from 'koa-pug';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import methodOverride from 'koa-methodoverride';
import session from 'koa-generic-session';
import logger from 'koa-logger';
import cn from 'classnames';
import flash from 'koa-flash-simple';
import applyRouting from './routes';
import db from './models';


const app = new Koa();
const router = new Router();

app.keys = ['heavy rain'];

app.use(session(app));
app.use(flash());
app.use(logger());
app.use(serve(path.join(__dirname, '../public')));
app.use(bodyParser());
app.use(methodOverride('_method'));

const pug = new Pug({
  viewPath: path.join(__dirname, 'views'),
  noCache: true,
  debug: true,
  pretty: true,
  compileDebug: true,
  locals: [],
  basedir: path.join(__dirname, 'views'),
  helperPath: [
    {
      urlFor: (...args) => router.url(...args),
      cn,
    },
  ],
});
pug.use(app);

app.use(async (ctx, next) => {
  const { userId } = ctx.session;
  const user = await db.User.findOne({
    where: { id: userId },
    raw: true,
  });

  ctx.state = {
    flash: ctx.flash,
    isSignedIn: () => userId !== undefined,
    currentUrl: ctx.url,
    userId,
    user,
    db,
  };

  await next();
});

applyRouting(app, router);

export default app;
