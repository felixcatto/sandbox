import { getTodos } from '../lib/db';

export default app => {
  app.get('/todos', (req, res) => {
    res.json(getTodos());
  });
};
