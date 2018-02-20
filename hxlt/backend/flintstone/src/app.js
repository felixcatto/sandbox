import express from 'express';
import path from 'path';
import fs from 'fs';
import Router from 'named-routes';
import applyHomeRouter from './pages/home/homeController';
import applyWeaponsRouter from './pages/weapons/weaponsController';


const app = express();
app.locals.template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const router = new Router();
router.extendExpress(app);
app.locals.url = app.namedRoutes.build.bind(app.namedRoutes);

app.use('/', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals = {
    ...app.locals,
    settings: null,
    pathname: req.path,
  };
  next();
});

applyHomeRouter(app);
applyWeaponsRouter(app);

export default app;
