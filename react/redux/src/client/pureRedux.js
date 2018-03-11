import { omit, omitBy } from 'lodash';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { composeWithDevTools } from 'redux-devtools-extension';


const printState = (store) => {
  document.querySelector('#app').innerHTML = `
    <pre>${JSON.stringify(store.getState(), null, 2)}</pre>
  `;
};

// INTRO 1
// const reducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//     default:
//       return state;
//   }
// };


// const store = createStore(reducer);

// store.subscribe(() =>
//   console.log(store.getState()),
// );

// const incrementAction = { type: 'INCREMENT' };
// const decrementAction = { type: 'DECREMENT' };
// store.dispatch(incrementAction);
// store.dispatch(incrementAction);
// store.dispatch(decrementAction);

// window.store = store;


// TASK 1
// const addTask = task => ({
//   type: 'TASK_ADD',
//   payload: {
//     task,
//   },
// });

// const removeTask = id => ({
//   type: 'TASK_REMOVE',
//   payload: {
//     id,
//   },
// });

// const tasks = (state = {}, { type, payload }) => {
//   if (type === 'TASK_ADD') {
//     const { task } = payload;
//     return { ...state, [task.id]: task };
//   } else if (type === 'TASK_REMOVE') {
//     return omit(state, payload.id);
//   }
//   return state;
// };

// const init = initState => createStore(tasks, initState, composeWithDevTools());

// const store = init({ 100500: { id: 100500, name: '+100500' } });
// store.subscribe(() => console.log(store.getState()));
// store.dispatch(addTask({ id: 1, name: 'vasa eto boroda' }));
// store.dispatch(addTask({ id: 2, name: 'ggwp lanaya' }));
// store.dispatch(addTask({ id: 3, name: 'privet medved' }));
// store.dispatch(removeTask(2));






































// TASK 2
// const initState = {
//   comments: {
//     1: { id: 1, taskId: 1, body: 'comment 1' },
//     2: { id: 2, taskId: 1, body: 'comment 2' },
//     5: { id: 5, taskId: 2, body: 'another comment' },
//   },
//   tasks: {
//     1: { id: 1, name: 'first task' },
//     2: { id: 2, name: 'second task' },
//   },
// };

// const addTask = task => ({
//   type: 'TASK_ADD',
//   payload: {
//     task,
//   },
// });

// const removeTask = id => ({
//   type: 'TASK_REMOVE',
//   payload: {
//     id,
//   },
// });

// const addTaskComment = comment => ({
//   type: 'TASK_COMMENT_ADD',
//   payload: {
//     comment,
//   },
// });

// const removeTaskComment = id => ({
//   type: 'TASK_COMMENT_REMOVE',
//   payload: {
//     id,
//   },
// });

// const tasks = (state = {}, { type, payload }) => {
//   if (type === 'TASK_ADD') {
//     const { task } = payload;
//     return { ...state, [task.id]: task };
//   } else if (type === 'TASK_REMOVE') {
//     return omit(state, payload.id);
//   }
//   return state;
// };

// const comments = (state = {}, { type, payload }) => {
//   if (type === 'TASK_COMMENT_ADD') {
//     const { comment } = payload;
//     return { ...state, [comment.id]: comment };
//   } else if (type === 'TASK_COMMENT_REMOVE') {
//     return omit(state, payload.id);
//   } else if (type === 'TASK_REMOVE') {
//     return omitBy(state, comment => comment.taskId === payload.id);
//   }
//   return state;
// };


// const rootReducer = combineReducers({ tasks, comments });
// const store = createStore(rootReducer, initState, composeWithDevTools());
// store.subscribe(() => console.log(store.getState()));
// store.subscribe(() => printState(store));
// store.dispatch(addTask({ id: 11, name: 'vasa eto boroda' }));
// store.dispatch(addTask({ id: 12, name: 'ggwp lanaya' }));
// store.dispatch(addTask({ id: 13, name: 'privet medved' }));
// store.dispatch(addTaskComment({ id: 3, taskId: 11, body: 'rili boroda' }));
// store.dispatch(removeTask(1));
// store.dispatch(removeTask(13));














































// TASK 3
const addTask = createAction('TASK_ADD');
const updateTask = createAction('TASK_UPDATE');
const removeTask = createAction('TASK_REMOVE');

const tasks = handleActions({
  [addTask]: (state, { payload: task }) => ({ ...state, [task.id]: task }),
  [updateTask]: (state, { payload: task }) => ({ ...state, [task.id]: task }),
  [removeTask]: (state, { payload: id }) => omit(state, id),
}, {});

const rootReducer = combineReducers({ tasks });
const store = createStore(rootReducer, composeWithDevTools());
store.subscribe(() => console.log(store.getState()));
store.subscribe(() => printState(store));
store.dispatch(addTask({ id: 11, name: 'vasa eto boroda' }));
store.dispatch(addTask({ id: 12, name: 'ggwp lanaya' }));
store.dispatch(addTask({ id: 13, name: 'privet medved' }));
store.dispatch(removeTask(13));
store.dispatch(updateTask({ id: 11, name: 'vasa eto boroda (updated)' }));
