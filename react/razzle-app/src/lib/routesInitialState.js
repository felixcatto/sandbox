import { getTodos } from './db';
import { asyncStates } from '../client/lib/utils';
import routes from '../client/lib/routes';
import { $todoList } from '../client/todolistSlice';

const [todoListKey] = Object.keys($todoList);

export default {
  [routes.effector]: () => ({
    [todoListKey]: {
      data: getTodos(),
      status: asyncStates.resolved,
      errors: null,
    },
  }),
};
