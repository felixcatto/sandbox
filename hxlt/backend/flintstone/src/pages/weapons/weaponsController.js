import express from 'express';
import weaponsList from './weaponsDAL';


export default (app) => {
  app.get('/weapons', 'weapons', (req, res) => {
    res.render('weapons/Weapons', {
      weaponsList,
    });
  });
};
