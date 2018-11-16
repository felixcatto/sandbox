import buildFormObj from '../lib/formObjectBuilder';
import { encrypt } from '../lib/secure';
import { User } from '../models';
import { emptyObject } from '../lib/utils';


export default (router) => {
  router
    .get('newSession', '/session/new', async (ctx) => {
      const data = {};
      console.log(buildFormObj(data));
      ctx.render('sessions/new', {
        user: emptyObject,
      });
    })

    .post('session', '/session', async (ctx) => {
      const { email, password } = ctx.request.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      // user
      //   ? console.log(user.get({ plain: true }))
      //   : console.log(user);

      if (user?.passwordDigest === encrypt(password)) {
        ctx.session.userId = user.id;
        ctx.redirect(router.url('root'));
        return;
      }

      // ctx.flash.set('email or password were wrong');
      ctx.render('sessions/new', {
        user: {
          email,
          password: '',
        },
      });
    })

    .delete('session', '/session', (ctx) => {
      ctx.session = {};
      ctx.redirect(router.url('root'));
    });
};
