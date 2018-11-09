export default (app, router) => {
  router.get('home', '/', (ctx) => {
    ctx.render('common/index');
  });

  router.get('articles', '/articles', (ctx) => {
    ctx.render('articles/index');
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
