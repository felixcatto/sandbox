import { createAction } from 'redux-actions';
import { uniqueId } from 'lodash';

export const addTask = createAction('TASK_ADD', task => ({ id: uniqueId(), state: 'active', ...task }));
export const updateNewTaskText = createAction('NEW_TASK_TEXT_UPDATE');
export const removeTask = createAction('TASK_REMOVE');
export const toggleTaskState = createAction('TASK_STATE_TOGGLE');
