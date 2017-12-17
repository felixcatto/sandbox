import express from 'express';
import encrypt from '../lib/encrypt';
import Post from '../entities/Post';
import User from '../entities/User';
import {
  getUsers,
  getUserByID,
  getUserByName,
  getUserByNameNPass,
  insertUser,
} from '../DAL/users';
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
usersRouter.route('/')
  .get(async (req, res) => {
    const users = await getUsers();
    res.render('users/list', {
      data: { users },
    });
  });

usersRouter.route('/new')
  .get((req, res) => {
    res.render('users/new');
  })
  .post(async (req, res) => {
    const { name, pass } = req.body;
    const isUserAlreadyExist = await getUserByName(name);
    const errors = {};
    if (!name) {
      errors.name = 'Name can\'t be blank';
    }

    if (isUserAlreadyExist) {
      errors.name = 'User with this name already registered';
    }

    if (!pass) {
      errors.pass = 'Password can\'t be blank';
    }

    if (Object.keys(errors).length === 0) {
      const id = await insertUser(name, encrypt(pass), 'user');
      req.session.currentUserID = id;
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
  .post(async (req, res) => {
    const { name, pass } = req.body;
    const errors = {};
    const user = await getUserByNameNPass(name, encrypt(pass));
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
    if (i !== -1) {
      posts.splice(i, 1);
    }
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


export default (app) => {
  app.get('/', (req, res) => {
    res.render('common/index');
  });
  app.use('/users', usersRouter);
  app.use('/posts', postsRouter);
  app.use('/misc', miscRouter);
};
