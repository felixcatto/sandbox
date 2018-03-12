import { createAction } from 'redux-actions';
import { uniqueId } from 'lodash';

export const addTask = createAction('TASK_ADD', task => ({ ...task, id: uniqueId() }));
export const updateNewTaskText = createAction('NEW_TASK_TEXT_UPDATE');
export const removeTask = createAction('TASK_REMOVE');
