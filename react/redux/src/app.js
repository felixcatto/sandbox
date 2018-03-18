import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import path from 'path';
import fs from 'fs';
import bodyParser from 'koa-bodyparser';
import applyTasksApi from './api/tasks';


const app = new Koa();
const router = new Router();
const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

app.use(serve(path.join(__dirname, 'public')));
app.use(bodyParser());

router.get('/', (ctx) => {
  ctx.body = template;
});

applyTasksApi(router);

app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
