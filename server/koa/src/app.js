import Koa from 'koa';
import path from 'path';
import fs from 'fs';


const app = new Koa();
const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

app.use(async ctx => {
  ctx.body = template;
});

export default app;
