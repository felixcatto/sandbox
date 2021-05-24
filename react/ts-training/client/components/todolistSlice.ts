import { createStore, createEvent, createEffect } from 'effector';
import { uniqueId } from 'lodash-es';
import { makeEnum, asyncStates } from '../lib/utils';
import api from '../lib/api';

export const filterStates = makeEnum(['all', 'completed', 'incomplete'] as const);

export const actions = {
  addNewTodo: createEvent(),
  deleteTodo: createEvent(),
  changeTodoStatus: createEvent(),
  changeFilter: createEvent(),
  loadTodos: createEffect(async ms => api.todos.get(ms)),
};

export type ITodoList = {
  id: any;
  text: any;
  isCompleted: boolean;
}[];

type ITodoListState = {
  data: ITodoList;
  status: keyof typeof asyncStates;
  errors: null | string;
};

const makeTodoList = (
  initialState: ITodoListState = {
    data: [],
    status: asyncStates.idle,
    errors: null,
  }
) =>
  createStore(initialState)
    .on(actions.addNewTodo, (state, text) => ({
      ...state,
      data: state.data.concat({
        id: uniqueId(),
        text,
        isCompleted: false,
      }),
    }))
    .on(actions.deleteTodo, (state, todoId) => ({
      ...state,
      data: state.data.filter(el => el.id !== todoId),
    }))
    .on(actions.changeTodoStatus, (state, todoId) => ({
      ...state,
      data: state.data.map(todo =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    }))
    .on(actions.loadTodos, () => ({
      data: [],
      status: asyncStates.pending,
      errors: null,
    }))
    .on(actions.loadTodos.done, (state, { result: items }) => ({
      data: items,
      status: asyncStates.resolved,
      errors: null,
    }));

const makeFilterState = (initialState = filterStates.all) =>
  createStore(initialState).on(actions.changeFilter, (state, newFilterState) => newFilterState);

export const $todoList = { $todoList: makeTodoList };
export const $filterState = { $filterState: makeFilterState };

export const filteredTodosSelector = (todoList, filterState) => {
  let filterTodoFunc;
  if (filterState === filterStates.all) {
    filterTodoFunc = () => true;
  } else if (filterState === filterStates.incomplete) {
    filterTodoFunc = todo => !todo.isCompleted;
  } else if (filterState === filterStates.completed) {
    filterTodoFunc = todo => todo.isCompleted;
  }
  return todoList.data.filter(filterTodoFunc);
};

export type I$TodoList = ReturnType<typeof makeTodoList>;
export type I$FilterState = ReturnType<typeof makeFilterState>;
export type ITodoListActions = typeof actions;
