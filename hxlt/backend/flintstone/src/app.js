import express from 'express';
import path from 'path';
import cons from 'consolidate';
import react from 'react';
import homeRouter from './pages/home/homeController';
import weaponsRouter from './pages/weapons/weaponsController';


const app = express();
app.engine('jsx', cons.react);
app.set('view engine', 'jsx');
app.set('views', `${__dirname}/pages`);
app.locals.base = `${__dirname}/index.html`;

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/weapons', weaponsRouter);

export default app;
