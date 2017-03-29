import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Lists } from '../../api/lists/lists.js';
import { Todos } from '../../api/todos/todos.js';
import './todos-page.html';
import '../components/todos.js';



Template.todos_page.onCreated(function() {
    this.listId = FlowRouter.getParam('id');
    this.subscribe('lists');
    this.subscribe('todos');
});


Template.todos_page.helpers({
    todosCursor() {
        return Todos.find({ listId: Template.instance().listId });
    },
    list() {
        return Lists.findOne({ _id: Template.instance().listId });
    },
});