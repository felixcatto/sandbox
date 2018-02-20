import render from '../../lib/render';
import Home from './Home';


export default (app) => {
  app.get('/', 'home', (req, res) => {
    const html = render(res.locals, Home);
    res.send(html);
  });
};
