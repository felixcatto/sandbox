import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { addTask, updateNewTaskText } from '../actions';

const tasks = handleActions({
  [addTask]: (state, { payload: task }) => ({ ...state, [task.id]: task }),
}, {});

const newTaskText = handleActions({
  [updateNewTaskText]: (state, { payload: text }) => text,
  [addTask]: (state, { payload: text }) => '',
}, '');


export default combineReducers({ tasks, newTaskText });
