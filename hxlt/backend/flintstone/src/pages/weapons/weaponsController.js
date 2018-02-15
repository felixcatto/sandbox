import express from 'express';
import weaponsList from './weaponsDAL';


const weaponsRouter = express.Router();
weaponsRouter.route('/')
  .get(async (req, res) => {
    res.render('weapons/Weapons', {
      weaponsList,
    });
  });

export default weaponsRouter;
