import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { omit } from 'lodash'
import { addTask, updateNewTaskText, removeTask } from '../actions';


const tasks = handleActions({
  [addTask]: (state, { payload: task }) => ({ ...state, [task.id]: task }),
  [removeTask]: (state, { payload: id }) => omit(state, id),
}, {});

const newTaskText = handleActions({
  [updateNewTaskText]: (state, { payload: text }) => text,
  [addTask]: (state, { payload: text }) => '',
}, '');

export default combineReducers({ tasks, newTaskText });
