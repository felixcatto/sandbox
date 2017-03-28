import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/ui/layouts/layout.js';
import '/imports/ui/pages/todo-show-page.js';


FlowRouter.route('/', {
    name: 'root',
    action() {
        BlazeLayout.render('layout', { template: '' });
    },
});

FlowRouter.route('/todo', {
    name: 'todo.show',
    action() {
        BlazeLayout.render('layout', { template: 'todo_show_page' });
    },
});