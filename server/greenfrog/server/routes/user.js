import { emptyObject } from '../lib/utils';


export default (router) => {
  const userFields = [
    'firstName',
    'lastName',
    'email',
  ];

  router
    .get('users', '/users', async (ctx) => {
      const users = await ctx.db.User.findAll({ raw: true });
      ctx.render('users/index', { users });
    })

    .get('newUser', '/users/new', (ctx) => {
      ctx.render('users/new', { user: emptyObject });
    })

    .get('editUser', '/users/:id', async (ctx) => {
      const user = await ctx.db.User.findOne({
        where: { id: ctx.params.id },
        raw: true,
      });
      ctx.render('users/edit', { user, type: 'edit' });
    })

    .post('createUser', '/users', async (ctx) => {
      await ctx.db.User.create(ctx.request.body, {
        fields: userFields,
      });
      ctx.redirect(router.url('users'));
    })

    .put('updateUser', '/users/:id', async (ctx) => {
      await ctx.db.User.update(ctx.request.body, {
        where: { id: ctx.params.id },
        fields: userFields,
      });
      ctx.redirect(router.url('users'));
    })

    .delete('destroyUser', '/users/:id', async (ctx) => {
      await ctx.db.User.destroy({ where: { id: ctx.params.id } });
      ctx.redirect(router.url('users'));
    });
};
