export default (app, router) => {
  router.get('/', (ctx) => {
    ctx.body = ctx.template;
  });

  router.get('/pug', (ctx) => {
    ctx.render('index', { fo2o: 'ggwp', colors: ['red', 'green', 'blue'] });
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
