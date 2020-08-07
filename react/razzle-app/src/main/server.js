import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import App from '../client/App';
import applyApi from '../api';
import routesInitialState from '../lib/routesInitialState';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line

const makeHtml = (markup, initialState) => {
  const cssLink = assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : '';
  const jsLink =
    process.env.NODE_ENV === 'production'
      ? `<script src="${assets.client.js}" defer></script>`
      : `<script src="${assets.client.js}" defer crossorigin></script>`;
  const fontLink = assets[''].woff
    ? `<link rel='preload' href='${assets[''].woff}' as='font' type='font/woff' crossorigin='anonymous'>`
    : '';

  return `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${cssLink}
        ${jsLink}
        ${fontLink}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>window.INITIAL_STATE = ${JSON.stringify(initialState)}</script>
    </body>
</html>`;
};

const server = express();
server.disable('x-powered-by');
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

applyApi(server);
server.get('/*', (req, res) => {
  const getRouteState = routesInitialState[req.url];
  const initialState = getRouteState ? getRouteState() : {};

  const context = {};
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App initialState={initialState} />
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(makeHtml(markup, initialState));
  }
});

export default server;
