import { createStore, createEvent, createEffect } from 'effector';
import { uniqueId } from 'lodash';
import { filterStates, asyncStates } from './lib/utils';
import api from './lib/api';

export const actions = {
  addNewTodo: createEvent(),
  changeTodoStatus: createEvent(),
  changeFilter: createEvent(),
  loadTodos: createEffect().use(async ms => api.todos.get(ms)),
};

const makeTodoList = (
  initialState = {
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

export const $todoList = { $todoList: makeTodoList };

const makeFilterState = (initialState = filterStates.all) =>
  createStore(initialState).on(actions.changeFilter, (state, newFilterState) => newFilterState);

export const $filterState = { $filterState: makeFilterState };
