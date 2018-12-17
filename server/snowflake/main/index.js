import 'module-alias/register';
import path from 'path';
import express from 'express';
import fs from 'fs';
import Router from 'named-routes';
import '../lib/container';
import customRender from '../lib/customRender';
import applyRouting from '../routes';


export default () => {
  const app = express();
  const router = new Router();
  const template = fs
    .readFileSync(path.resolve(__dirname, '../views/common/index.html'), 'utf8');
  router.extendExpress(app);
  app.use(express.static(path.resolve(__dirname, '../public')));

  app.use((req, res, next) => {
    res.locals = {
      template,
      viewsDir: path.resolve(__dirname, '../views'),
      helpers: {
        urlFor: app.namedRoutes.build.bind(app.namedRoutes),
        currentUrl: req.url,
      },
    };
    next();
  });

  app.use(customRender);
  applyRouting(app);

  return app;
};
