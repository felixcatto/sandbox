import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { fetchTasks } from './actions';
import reducers from './reducers';
import AppContainer from './containers/App';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(fetchTasks());

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app'),
);
