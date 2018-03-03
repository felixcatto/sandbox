import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default (globals, Component, locals = {}, scriptName) => {
  const props = { ...globals, ...locals };
  const renderedComponent = ReactDOMServer.renderToStaticMarkup(<Component {...props} />);
  const script = scriptName
    ? `<script src="/js/${scriptName}.js"></script>`
    : '';
  const html = globals.template
    .replace('{{content}}', renderedComponent)
    .replace('{{clientPageScript}}', script);
  return html;
};
