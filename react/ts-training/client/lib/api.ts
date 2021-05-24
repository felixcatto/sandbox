import { uniqueId } from 'lodash-es';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const todos = [
  {
    id: uniqueId(),
    text: 'hello, i am first ToDo',
    isCompleted: false,
  },
  {
    id: uniqueId(),
    text: 'vasa eto boroda',
    isCompleted: false,
  },
  {
    id: uniqueId(),
    text: 'Molten boulder',
    isCompleted: true,
  },
];

export default {
  todos: {
    get: async ms => {
      await sleep(ms);
      return todos;
    },
  },
};
