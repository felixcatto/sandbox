import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';


export const toggleTaskState = createAction('TASK_STATE_TOGGLE');

export const fetchTasksRequest = createAction('TASKS_FETCH_REQUEST');
export const fetchTasksSuccess = createAction('TASKS_FETCH_SUCCESS');
export const fetchTasksFailure = createAction('TASKS_FETCH_FAILURE');

export const removeTaskRequest = createAction('TASK_REMOVE_REQUEST');
export const removeTaskSuccess = createAction('TASK_REMOVE_SUCCESS');
export const removeTaskFailure = createAction('TASK_REMOVE_FAILURE');

export const addTaskRequest = createAction('TASK_ADD_REQUEST');
export const addTaskSuccess = createAction('TASK_ADD_SUCCESS');
export const addTaskFailure = createAction('TASK_ADD_FAILURE');

export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const { data: tasks } = await axios.get(routes.tasksUrl());
    dispatch(fetchTasksSuccess(tasks));
  } catch (e) {
    dispatch(fetchTasksFailure());
  }
};

export const removeTask = id => async (dispatch) => {
  dispatch(removeTaskRequest());
  try {
    await axios.delete(routes.taskUrl(id));
    dispatch(removeTaskSuccess(id));
  } catch (e) {
    dispatch(removeTaskFailure(id));
  }
};

export const addTask = ({ text }) => async (dispatch) => {
  dispatch(addTaskRequest());
  try {
    const { data: task } = await axios.post(routes.tasksUrl(), { text });
    dispatch(addTaskSuccess(task));
  } catch (e) {
    dispatch(addTaskFailure(text));
  }
};
