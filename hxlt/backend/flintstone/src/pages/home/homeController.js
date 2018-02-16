import express from 'express';


export default (app) => {
  app.get('/', 'home', (req, res) => {
    res.render('home/Home.jsx');
  });
};
