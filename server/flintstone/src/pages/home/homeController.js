import render from '../../lib/render';
import clientPages from '../../lib/clientPages';
import Home from './Home';


export default (app) => {
  app.get('/', 'home', (req, res) => {
    const html = render(res.locals, Home, {}, clientPages.home);
    res.send(html);
  });
};
