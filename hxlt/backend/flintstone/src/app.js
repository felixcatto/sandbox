import express from 'express';
import path from 'path';
import cons from 'consolidate';
import Router from 'named-routes';
import applyHomeRouter from './pages/home/homeController';
import applyWeaponsRouter from './pages/weapons/weaponsController';


const app = express();
app.engine('jsx', cons.react);
app.set('view engine', 'jsx');
app.set('views', `${__dirname}/pages`);
app.locals.base = `${__dirname}/index.html`;

const router = new Router();
router.extendExpress(app);
app.locals.url = app.namedRoutes.build.bind(app.namedRoutes);

app.use('/', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.pathname = req.path;
  next();
});

applyHomeRouter(app);
applyWeaponsRouter(app);

export default app;
