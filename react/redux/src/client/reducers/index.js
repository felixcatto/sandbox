import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { omit, keyBy } from 'lodash'
import * as actions from '../actions';

const tasksFetchingState = handleActions({
  [actions.fetchTasksRequest]: () => 'requested',
  [actions.fetchTasksSuccess]: () => 'succeed',
  [actions.fetchTasksFailure]: () => 'failed',
}, 'none');

const taskRemovingState = handleActions({
  [actions.removeTaskRequest]: () => 'requested',
  [actions.removeTaskSuccess]: () => 'succeed',
  [actions.removeTaskFailure]: () => 'failed',
}, 'none');

const taskAddingState = handleActions({
  [actions.addTaskRequest]: () => 'requested',
  [actions.addTaskSuccess]: () => 'succeed',
  [actions.addTaskFailure]: () => 'failed',
}, 'none');

const tasks = handleActions({
  [actions.fetchTasksSuccess]: (state, { payload: tasks }) => keyBy(tasks, 'id'),
  [actions.addTaskSuccess]: (state, { payload: task }) => ({ ...state, [task.id]: task }),
  [actions.removeTaskSuccess]: (state, { payload: id }) => omit(state, id),
  [actions.toggleTaskState]: (state, { payload: id }) => {
    const task = state[id];
    const newState = task.state === 'finished' ? 'active' : 'finished';
    return { ...state, [id]: { ...task, state: newState } };
  },
}, {});

export default combineReducers({
  tasksFetchingState,
  taskRemovingState,
  taskAddingState,
  tasks,
});
