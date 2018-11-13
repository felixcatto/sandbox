export default (router) => {
  router
    .get('articles', '/articles', (ctx) => {
      ctx.render('articles/index');
    })

    .post('articles', '/articles', (ctx) => {
      ctx.redirect(router.url('articles'));
    })

    .get('newArticle', '/articles/new', (ctx) => {
      ctx.render('articles/new');
    });
};
