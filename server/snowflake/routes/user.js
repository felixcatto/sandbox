import { getRepository } from 'typeorm';
import { User } from '../entity/User';


export default (app) => {
  const userRepo = getRepository(User);

  app.get('/users', 'users', async (req, res) => {
    const users = await userRepo.createQueryBuilder()
      .orderBy('id')
      .getMany();
    res.render('users/index', { users });
  });

  app.get('/users/new', 'newUser', (req, res) => {
    res.render('users/new');
  });

  app.get('/users/:id/edit', 'editUser', async (req, res) => {
    const user = await userRepo.createQueryBuilder()
      .select()
      .where('id = :id', { id: req.params.id })
      .getOne();

    res.render('users/edit', {
      user: {
        ...user,
        password: '',
      },
      type: 'edit',
    });
  });

  app.put('/users/:id', 'user', async (req, res) => {
    try {
      const { urlFor } = res.locals;
      await userRepo.createQueryBuilder()
        .update()
        .set(req.body)
        .where('id = :id', { id: req.params.id })
        .execute();

      res.redirect(urlFor('users'));
    } catch (e) {
      console.log(e);
      // ctx.render('users/edit', {
      //   user: buildFormObj(ctx.request.body, e, ctx.params.id),
      //   type: 'edit',
      // });
    }
  });

  app.post('/users', 'users', async (req, res) => {
    try {
      const { urlFor } = res.locals;
      await userRepo.createQueryBuilder()
        .insert()
        .values(req.body)
        .execute();

      res.redirect(urlFor('users'));
    } catch (e) {
      console.log(e);
      res.render('users/new', {
        user: {},
      });
    }
  });

  app.delete('/users/:id', 'user', async (req, res) => {
    const { urlFor } = res.locals;
    await userRepo.createQueryBuilder()
      .delete()
      .where('id = :id', { id: req.params.id })
      .execute();

    res.redirect(urlFor('users'));
  });
};
