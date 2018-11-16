import applyUserRouting from './user';
import applyArticleRouting from './article';
import applySessionRouting from './session';


export default (app, router) => {
  router.get('root', '/', (ctx) => {
    ctx.render('common/index');
  });

  applyUserRouting(router);
  applyArticleRouting(router);
  applySessionRouting(router);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
