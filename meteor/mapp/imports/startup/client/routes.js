import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/ui/layouts/layout.js';
import '/imports/ui/pages/index-page.js';
import '/imports/ui/pages/todo-show-page.js';


FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('layout', { template: 'index_page' });
    },
});

FlowRouter.route('/todo', {
    name: 'todo',
    action() {
        BlazeLayout.render('layout', { template: 'todo_show_page' });
    },
});