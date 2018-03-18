import { uniqueId } from 'lodash';


const makeTask = text => ({ id: uniqueId(), state: 'active', text });
let tasks = [
  makeTask('vasa eto boroda'),
  makeTask('ggwp lanaya'),
  makeTask('privet medved'),
];

export default (router) => {
  router
    .get('/tasks', (ctx) => {
      ctx.body = tasks;
    })
    .post('/tasks', (ctx) => {
      const { text } = ctx.request.body;
      const task = makeTask(text);
      tasks.push(task);
      ctx.body = task;
    })
    .get('/tasks/:id', (ctx) => {
      const { id } = ctx.params;
      ctx.body = tasks.filter(el => el.id === id);
    })
    .delete('/tasks/:id', (ctx) => {
      const { id } = ctx.params;
      tasks = tasks.filter(el => el.id !== id);
      ctx.status = 200;
    });
};
