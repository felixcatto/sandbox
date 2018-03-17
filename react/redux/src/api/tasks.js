const tasks = [
  { id: '0', state: 'active', text: 'vasa eto boroda' },
  { id: '1', state: 'active', text: 'ggwp lanaya' },
  { id: '2', state: 'active', text: 'privet medved' },
];

export default (router) => {
  router
    .get('/tasks', (ctx) => {
      ctx.body = tasks;
    })
    .post('/tasks', (ctx) => {
      console.log(ctx.request.body);
    })
    .get('/tasks/:id', (ctx) => {
      const { id } = ctx.params;
      ctx.body = tasks.filter(el => el.id === +id);
    });
};
