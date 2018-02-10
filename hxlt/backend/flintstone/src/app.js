import express from 'express';


const app = express();

app.route('/')
  .get((req, res) => {
    res.send('wowowowow');
  });

export default app;
