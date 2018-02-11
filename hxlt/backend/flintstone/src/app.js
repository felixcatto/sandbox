import express from 'express';
import path from 'path';
import cons from 'consolidate';
import react from 'react';


const app = express();
app.engine('jsx', cons.react);
app.set('view engine', 'jsx');
app.set('views', `${__dirname}/views/components`);
app.locals.base = `${__dirname}/views/layout/index.html`;

app.use('/', express.static(path.join(__dirname, 'public')));


app.route('/')
  .get((req, res) => {
    res.render('main', {
      user: 'vasa',
    });
  });

export default app;
