import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import AppContainer from './containers/App';

const initialState = {
  tasks: { 0: { id: '0', text: 'eh nihrena sebe' } },
  newTaskText: '',
};
const store = createStore(reducers, initialState, composeWithDevTools());

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app'),
);
