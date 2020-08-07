import { uniqueId } from 'lodash';

const idPrefix = 'server_';
const db = {
  todos: [
    {
      id: uniqueId(idPrefix),
      text: 'hello, i am first ToDo',
      isCompleted: false,
    },
    {
      id: uniqueId(idPrefix),
      text: 'vasa eto boroda',
      isCompleted: false,
    },
    {
      id: uniqueId(idPrefix),
      text: 'Molten boulder',
      isCompleted: true,
    },
  ],
};

export const getTodos = () => db.todos;
