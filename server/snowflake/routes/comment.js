import { getRepository } from 'typeorm';
import { Article } from '../entity/Article';
import { Comment } from '../entity/Comment';


export default (app, useParentRoute) => {
  const commentRepo = getRepository(Comment);
  const articleRepo = getRepository(Article);

  app
    .get(useParentRoute('/comments/:id/edit'), 'editComment', async (req, res) => {
      const { articleId, id } = req.params;
      const article = await articleRepo.createQueryBuilder()
        .where('id = :articleId', { articleId })
        .getOne();

      const comment = await commentRepo.createQueryBuilder()
        .where('id = :id', { id })
        .getOne();

      res.render('comments/edit', { article, comment, type: 'edit' });
    })

    .post(useParentRoute('/comments'), 'comments', async (req, res) => {
      const { articleId } = req.params;

      await commentRepo.createQueryBuilder()
        .insert()
        .values({ ...req.body, article: articleId })
        .execute();

      res.redirect(res.locals.urlFor('article', { id: articleId }));
    })

    .put(useParentRoute('/comments/:id'), 'comment', async (req, res) => {
      const { articleId, id } = req.params;
      await commentRepo.createQueryBuilder()
        .update()
        .set({ ...req.body })
        .where('id = :id', { id })
        .execute();

      res.redirect(res.locals.urlFor('article', { id: articleId }));
    })

    .delete(useParentRoute('/comments/:id'), 'comment', async (req, res) => {
      const { articleId } = req.params;
      await commentRepo.createQueryBuilder()
        .delete()
        .where('id = :id', { id: req.params.id })
        .execute();

      res.redirect(res.locals.urlFor('article', { id: articleId }));
    });
};
