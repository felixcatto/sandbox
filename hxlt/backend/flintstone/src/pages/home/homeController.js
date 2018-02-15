import express from 'express';

const homeRouter = express.Router();
homeRouter.get('/', async (req, res) => {
  res.render('home/Home.jsx');
});

export default homeRouter;
