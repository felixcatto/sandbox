import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default (globals, Component, locals = {}) => {
  const props = { ...globals, ...locals };
  const renderedComponent = ReactDOMServer.renderToStaticMarkup(<Component {...props} />);

  const html = globals.template
    .replace('{{content}}', renderedComponent);
  return html;
};
