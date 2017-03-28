import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Todos } from '../../api/todos/todos.js';
import './todo-show.html';

Template.todo_show.onRendered(function() {
    console.log(this.data);
});

Template.todo_show.events({
    'click .js-add-todo'(event, instance) {
        var input = instance.$('.js-add-todo-input');
        var text = input.val();
        Meteor.call('todos.insert', {
            text: text,
            checked: false,
            createdAt: new Date(),
        });
        input.val('');
    },
});