import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import App from './client/App';

hydrate(
  <BrowserRouter>
    <App initialState={window.INITIAL_STATE} />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
