FlowRouter.route('/', {
  name: 'home',
  action() {
      BlazeLayout.render('Layout', { template: 'Welcome' });
  },
});