import Koa from 'koa';
import serve from 'koa-static';
import path from 'path';
import Pug from 'koa-pug';
import Router from 'koa-router';
import _ from 'lodash';
import bodyParser from 'koa-bodyparser';
import methodOverride from 'koa-methodoverride';
import applyRouting from './routes';
import db from './models';


const app = new Koa();
const router = new Router();
app.context.db = db;

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
    { _ },
    { urlFor: (...args) => router.url(...args) },
  ],
});
pug.use(app);

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

applyRouting(app, router);

export default app;
