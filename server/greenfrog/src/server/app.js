import Koa from 'koa';
import serve from 'koa-static';
import path from 'path';
import fs from 'fs';
import Pug from 'koa-pug';
import Router from 'koa-router';
import _ from 'lodash';
import applyRouting from './routes';


const app = new Koa();
const router = new Router();
const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
app.context.template = template;

app.use(serve(path.join(__dirname, '../public')));

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

pug.locals.someKey = 'some value'
pug.locals.foo = 'FOO BAR?';
pug.locals.youAreUsingPug = true;

app.use((ctx, next) => {
  // console.log(ctx.cookies.get('_railsapp_session'));
  // ctx.cookies.set('koa_app', 'vasa eto bruda');
  next();
});

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
