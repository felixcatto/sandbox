import { getRepository } from 'typeorm';
import { isEmpty } from 'lodash';
import {
  emptyObject, createEntity, isEmailUnique, ivalidate,
} from 'Lib/utils';
import { encrypt } from 'Lib/secure';
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
    res.render('users/new', { user: emptyObject });
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

  app.post('/users', 'users', async (req, res) => {
    const user = createEntity(User, req.body);
    const errors = await ivalidate(user);

    const isUserEmailUnique = await isEmailUnique(req.body.email);
    if (!isUserEmailUnique) {
      errors.email = 'Email already exists';
    }

    if (isEmpty(errors)) {
      const { urlFor } = res.locals;
      const password = encrypt(req.body.password);
      await userRepo.createQueryBuilder()
        .insert()
        .values({ ...req.body, password })
        .execute();

      res.redirect(urlFor('users'));
    } else {
      res.render('users/new', { user, errors });
    }
  });

  app.put('/users/:id', 'user', async (req, res) => {
    const { id } = req.params;
    const user = createEntity(User, req.body);
    const errors = await ivalidate(user);

    const isUserEmailUnique = await isEmailUnique(req.body.email, id);
    if (!isUserEmailUnique) {
      errors.email = 'Email already exists';
    }

    if (isEmpty(errors)) {
      const { urlFor } = res.locals;
      const password = encrypt(req.body.password);
      await userRepo.createQueryBuilder()
        .update()
        .set({ ...req.body, password })
        .where('id = :id', { id })
        .execute();

      res.redirect(urlFor('users'));
    } else {
      res.render('users/edit', {
        user: { ...req.body, id },
        errors,
        type: 'edit',
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
