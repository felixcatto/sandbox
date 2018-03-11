import Koa from 'koa';
import serve from 'koa-static';
import path from 'path';
import fs from 'fs';


const app = new Koa();
const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

app.use(serve(path.join(__dirname, 'public')));

app.use((ctx) => {
  ctx.body = template;
});

export default app;
