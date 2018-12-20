import { getRepository } from 'typeorm';
import { emptyObject } from 'Lib/utils';
import { Article } from '../entity/Article';
import applyCommentsRouting from './comment';


export default (app) => {
  const articleRepo = getRepository(Article);

  app
    .get('/articles', 'articles', async (req, res) => {
      const articles = await articleRepo.createQueryBuilder()
        .orderBy('id')
        .getMany();

      res.render('articles/index', { articles });
    })

    .get('/articles/new', 'newArticle', (req, res) => {
      res.render('articles/new', { article: emptyObject });
    })

    .get('/articles/:id', 'article', async (req, res) => {
      const article = await articleRepo.createQueryBuilder('ar')
        .leftJoinAndSelect('ar.comments', 'co')
        .where('ar.id = :id', { id: req.params.id })
        .orderBy('co.id')
        .getOne();

      res.render('articles/show', { article });
    })

    .get('/articles/:id/edit', 'editArticle', async (req, res) => {
      const article = await articleRepo.createQueryBuilder()
        .select()
        .where('id = :id', { id: req.params.id })
        .getOne();

      res.render('articles/edit', { article, type: 'edit' });
    })

    .post('/articles', 'articles', async (req, res) => {
      const { urlFor } = res.locals;
      await articleRepo.createQueryBuilder()
        .insert()
        .values(req.body)
        .execute();

      res.redirect(urlFor('articles'));
    })

    .put('/articles/:id', 'article', async (req, res) => {
      const { id } = req.params;
      const { urlFor } = res.locals;
      await articleRepo.createQueryBuilder()
        .update()
        .set(req.body)
        .where('id = :id', { id })
        .execute();

      res.redirect(urlFor('articles'));
    })

    .delete('/articles/:id', 'article', async (req, res) => {
      const { urlFor } = res.locals;
      await articleRepo.createQueryBuilder()
        .delete()
        .where('id = :id', { id: req.params.id })
        .execute();

      res.redirect(urlFor('articles'));
    });

  const makeArticleRoute = route => `/articles/:articleId${route}`;
  applyCommentsRouting(app, makeArticleRoute);
};
