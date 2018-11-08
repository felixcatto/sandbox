import Koa from 'koa';
import serve from 'koa-static';
import path from 'path';
import fs from 'fs';
import applyRouting from './routes';


const app = new Koa();
const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

app.use(serve(path.join(__dirname, '../public')));

app.use((ctx, next) => {
  ctx.template = template;
  next();
});

applyRouting(app);

export default app;
