import express from 'express';
import cons from 'consolidate';
import react from 'react';


const app = express();
app.engine('jsx', cons.react);
app.set('view engine', 'jsx');
app.set('views', `${__dirname}/views`);
app.locals.base = `${__dirname}/views/layout/index.html`;


app.route('/')
  .get((req, res) => {
    res.render('components/main', {
      user: 'fedya23',
    });
  });

export default app;
