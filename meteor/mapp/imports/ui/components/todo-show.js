import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Todos } from '../../api/todos/todos.js';
import './todo-show.html';



Template.todo_show.onCreated(function() {
    // this.A = new ReactiveVar(null);
    // this.B = new ReactiveVar(null);
    // this.F = () => { console.log(this.A.get()) };

    this.getTodoId = function(el) {
        const todo = $(el).parent('.js-todo');
        return todo.length == 0 ? null : todo.attr('data-id');
    };

    // this.autorun(() => {
    //     console.log('autorunned');
    // });
    // // this.autorun(() => {
    // //     console.log(this.data.todos.fetch());
    // // });
    // this.autorun(this.F);
});


Template.todo_show.helpers({
    checkedText(todo) {
        return todo && todo.checked && 'todo-list__text_checked';
    },
});


Template.todo_show.events({
    'click .js-add-todo'(event, instance) {
        const input = instance.$('.js-add-todo-input');
        Meteor.call('todos.insert', {
            text: input.val(),
            checked: false,
        });
        input.val('');
    },
    'keydown input[type=text]'(event, instance) {
        if (event.which == 13) {
            const input = $(event.target);
            Meteor.call('todos.insert', {
                text: input.val(),
                checked: false,
            });
            input.val('');
        }
    },
    'click input[type=checkbox]'(event, instance) {
        const checkbox = event.target;
        const todoId = instance.getTodoId(checkbox);
        Meteor.call('todos.setChecked', todoId, checkbox.checked);
        // instance.A.set(Date.now());
    },
    'click .js-remove-todo'(event, instance) {
        const todoId = instance.getTodoId(event.target);
        Meteor.call('todos.remove', todoId);
    },
});