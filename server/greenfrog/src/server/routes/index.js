import Router from 'koa-router';


const router = new Router();

export default (app) => {
  router.get('/', (ctx) => {
    ctx.body = ctx.template;
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
