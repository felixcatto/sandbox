import React from 'react';
import Context from './context';
import { actions, makeTodoList, makeFilterState } from './todolistSlice';
import TodoList from './TodoList';

const EffectorApp = () => {
  const store = {
    actions,
    $todoList: makeTodoList(),
    $filterState: makeFilterState(),
  };

  return (
    <Context.Provider value={store}>
      <TodoList />
    </Context.Provider>
  );
};

export default EffectorApp;
