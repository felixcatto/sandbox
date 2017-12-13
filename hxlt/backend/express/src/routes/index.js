import express from 'express';
import encrypt from '../lib/encrypt';
import Post from '../entities/Post';
import User from '../entities/User';
import users from '../DAL/users';
import posts from '../DAL/posts';
import postsIndexHelpers from '../views/posts/index';


// miscRouter
const miscRouter = express.Router();
miscRouter.get('/agent', (req, res) => {
  const useragent = JSON.stringify(req.useragent, null, 2);
  res.send(`<pre>${useragent}</pre>`);
});


// usersRouter
const usersRouter = express.Router();
usersRouter.get('/', (req, res) => {
  res.render('users/list', {
    data: { users },
  });
});

usersRouter.route('/new')
  .get((req, res) => {
    res.render('users/new');
  })
  .post((req, res) => {
    const { name, pass } = req.body;
    const errors = {};
    if (!name) {
      errors.title = 'Name Can\'t be blank';
    }

    if (!pass) {
      errors.body = 'Password Can\'t be blank';
    }

    if (Object.keys(errors).length === 0) {
      const user = new User(name, pass);
      users.push(user);
      req.session.currentUserID = user.getID();
      res.redirect('/posts');
      return;
    }

    res.status(422);
    res.render('users/new', {
      data: {
        form: req.body,
        errors,
      },
    });
  });

usersRouter.get('/log-out', (req, res) => {
  req.session = null;
  res.redirect('/posts');
});

usersRouter.route('/log-in')
  .get((req, res) => {
    res.render('users/login');
  })
  .post((req, res) => {
    const { name, pass } = req.body;
    const errors = {};
    const user = users
      .find(user => user.getName() === name && user.getPassword() === encrypt(pass));
    if (!user) {
      errors.error = 'Something going wrong';
    }

    if (Object.keys(errors).length === 0) {
      req.session.currentUserID = user.getID();
      res.redirect('/posts');
      return;
    }

    res.status(422);
    res.render('users/login', {
      data: {
        form: req.body,
        errors,
      },
    });
  });


// postsRouter
const postsRouter = express.Router();
postsRouter.get('/', (req, res) => {
  res.render('posts/index', {
    data: { posts },
    helpers: postsIndexHelpers,
  });
});

postsRouter.route('/new')
  .get((req, res) => {
    res.render('posts/new');
  })
  .post((req, res) => {
    const { title, body } = req.body;
    const errors = {};
    if (!title) {
      errors.title = 'Title Can\'t be blank';
    }

    if (!body) {
      errors.body = 'Body Can\'t be blank';
    }

    if (Object.keys(errors).length === 0) {
      const post = new Post(title, body);
      posts.push(post);
      res.redirect('/posts');
      return;
    }

    res.status(422);
    res.render('posts/new', {
      data: {
        form: req.body,
        errors,
      },
    });
  });

postsRouter.route('/:id')
  .get((req, res) => {
    const post = posts.find(post => post.id === +req.params.id);
    if (!post) res.send('This post don\'n exist');

    res.render('posts/show', {
      data: { post },
    });
  })
  .delete((req, res) => {
    const i = posts.findIndex(post => post.id === +req.params.id);
    console.log(i);
    if (i !== -1) {
      posts.splice(i, 1);
    }
    console.log(posts);
    res.redirect('/posts');
  })
  .put((req, res) => {
    const post = posts.find(post => post.id === +req.params.id);
    const { title, body } = req.body;
    const errors = {};
    if (!title) {
      errors.title = 'Title Can\'t be blank';
    }

    if (!body) {
      errors.body = 'Body Can\'t be blank';
    }

    if (Object.keys(errors).length === 0) {
      post.setTitle(title);
      post.setBody(body);
      res.redirect('/posts');
      return;
    }

    res.status(422);
    res.render('posts/edit', {
      data: {
        action: `/posts/${post.getID()}?_method=PUT`,
        form: req.body,
        errors,
      },
    });
  });

postsRouter.get('/:id/edit', (req, res) => {
  const post = posts.find(post => post.id === +req.params.id);
  res.render('posts/edit', {
    data: {
      action: `/posts/${post.getID()}?_method=PUT`,
      form: {
        title: post.getTitle(),
        body: post.getBody(),
      },
    },
  });
});


export { usersRouter, postsRouter, miscRouter };
