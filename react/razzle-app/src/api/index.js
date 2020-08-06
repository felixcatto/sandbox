import { uniqueId } from 'lodash';

const db = {
  todos: [
    {
      id: uniqueId('server_'),
      text: 'hello, i am first ToDo',
      isCompleted: false,
    },
    {
      id: uniqueId('server_'),
      text: 'vasa eto boroda',
      isCompleted: false,
    },
    {
      id: uniqueId('server_'),
      text: 'Molten boulder',
      isCompleted: true,
    },
  ],
};

export default app => {
  app.get('/todos', (req, res) => {
    res.json(db.todos);
  });
};
