import applyUserRouting from './user';


export default (app) => {
  app.get('/', 'root', (req, res) => {
    res.render('root/index');
  });

  applyUserRouting(app);
};
