import React from 'react';
import { useStore } from 'effector-react';
import CommonTodoList from './CommonTodoList';
import Context from './context';

const TodoList = () => {
  const { actions, $todoList, $filterState } = React.useContext(Context);
  const todoList = useStore($todoList);
  const filterState = useStore($filterState);
  console.log({ todoList, filterState });

  return (
    <CommonTodoList
      filterState={filterState}
      todoListState={todoList.status}
      todoList={todoList.data}
      loadTodos={actions.loadTodos}
      changeFilter={actions.changeFilter}
      changeTodoStatus={actions.changeTodoStatus}
      addNewTodo={actions.addNewTodo}
    />
  );
};

export default TodoList;
