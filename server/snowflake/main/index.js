import 'module-alias/register';
import path from 'path';
import express from 'express';
import 'express-async-errors';
import fs from 'fs';
import Router from 'named-routes';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import initContainer from '../lib/container';
import customRender from '../lib/customRender';
import applyRouting from '../routes';


export default async () => {
  await initContainer();

  const app = express();
  const router = new Router();
  const template = fs
    .readFileSync(path.resolve(__dirname, '../views/common/index.html'), 'utf8');
  router.extendExpress(app);
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(methodOverride('_method'));

  app.use((req, res, next) => {
    const urlFor = app.namedRoutes.build.bind(app.namedRoutes);
    res.locals = {
      template,
      viewsDir: path.resolve(__dirname, '../views'),
      urlFor,
      helpers: {
        urlFor,
        currentUrl: req.url,
      },
    };
    next();
  });

  app.use(customRender);
  applyRouting(app);

  return app;
};
