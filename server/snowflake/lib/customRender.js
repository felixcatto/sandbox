import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import clientPages from './clientPages';
import Context from './context';


export default (req, res, next) => {
  res.render = (pathToComponent, locals = {}) => {
    const { template, viewsDir, helpers } = res.locals;
    const Component = require(path.join(viewsDir, pathToComponent)).default; // eslint-disable-line
    const renderedComponent = renderToStaticMarkup(
      <Context.Provider value={{ ...helpers }}>
        <Component {...locals} />
      </Context.Provider>,
    );

    const script = clientPages.includes(pathToComponent)
      ? `<script src="/js/${pathToComponent}.js"></script>`
      : '';

    const html = template
      .replace('{{content}}', renderedComponent)
      .replace('{{clientPageScript}}', script);

    res.send(html);
  };
  next();
};
