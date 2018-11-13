import applyUserRouting from './user';
import applyArticleRouting from './article';


export default (app, router) => {
  router.get('home', '/', (ctx) => {
    ctx.render('common/index');
  });

  applyUserRouting(router);

  applyArticleRouting(router);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
