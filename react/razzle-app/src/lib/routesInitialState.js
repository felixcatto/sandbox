import { getTodos } from './db';
import { asyncStates } from '../client/lib/utils';
import routes from '../client/lib/routes';

export default {
  [routes.effector]: () => ({
    $todoList: {
      data: getTodos(),
      status: asyncStates.resolved,
      errors: null,
    },
  }),
};
