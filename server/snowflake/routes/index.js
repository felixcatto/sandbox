import applyUserRouting from './user';
import applyArticleRouting from './article';


export default (app) => {
  app.get('/', 'root', (req, res) => {
    res.render('root/index');
  });

  applyUserRouting(app);
  applyArticleRouting(app);

  // eslint-disable-next-line
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.stack);
  });
};
