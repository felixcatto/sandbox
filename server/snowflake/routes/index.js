export default (app) => {
  app.get('/', 'root', (req, res) => {
    res.render('common/index');
  });
};
