export default (app) => {
  app.get('/users', 'users', (req, res) => {
    res.render('users/index');
  });
};
