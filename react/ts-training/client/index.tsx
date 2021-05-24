import './index.scss';
import React from 'react';
import { has } from 'lodash-es';
import { render } from 'react-dom';
import { combine } from 'effector';
import Todolist from './components/Todolist';
import Context from './lib/context';
import {
  actions,
  $todoList,
  $filterState,
  filteredTodosSelector,
} from './components/todolistSlice';
import type { IStore } from './lib/types';

const App = () => {
  const initialState = React.useContext(Context);
  const storeShape = {
    ...$todoList,
    ...$filterState,
  };

  const store = Object.keys(storeShape).reduce(
    (acc, storeKey) => {
      const effectorMakeFn = storeShape[storeKey];
      return {
        ...acc,
        [storeKey]: has(initialState, storeKey)
          ? effectorMakeFn(initialState[storeKey])
          : effectorMakeFn(),
      };
    },
    { actions }
  ) as IStore;
  store.$filteredTodos = combine(store.$todoList, store.$filterState, filteredTodosSelector);

  return (
    <Context.Provider value={store}>
      <div className="container app__container pt-20">
        <Todolist />
      </div>
    </Context.Provider>
  );
};

render(<App />, document.getElementById('root'));
