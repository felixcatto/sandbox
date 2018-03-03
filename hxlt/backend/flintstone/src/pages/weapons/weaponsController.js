import render from '../../lib/render';
import clientPages from '../../lib/clientPages';
import Weapons from './Weapons';
import weaponsList from './weaponsDAL';


export default (app) => {
  app.get('/weapons', 'weapons', (req, res) => {
    const html = render(res.locals, Weapons, { weaponsList }, clientPages.weapons);
    res.send(html);
  });
};
