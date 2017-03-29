import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/ui/layouts/layout.js';
import '/imports/ui/pages/index-page.js';
import '/imports/ui/pages/todos-page.js';
import '/imports/ui/pages/lists-page.js';



FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('layout', { template: 'index_page' });
    },
});

FlowRouter.route('/lists', {
    name: 'lists',
    action() {
        BlazeLayout.render('layout', { template: 'lists_page' });
    },
});

FlowRouter.route('/todos/:id', {
    name: 'todos',
    action() {
        BlazeLayout.render('layout', { template: 'todos_page' });
    },
});