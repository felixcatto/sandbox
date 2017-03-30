import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Todos } from '../../api/todos/todos.js';
import './todos.html';



Template.todos_show.onCreated(function() {
    // this.A = new ReactiveVar(null);
    // this.B = new ReactiveVar(null);
    // this.F = () => { console.log(this.A.get()) };
    //
    // this.autorun(() => {
    //     console.log('autorunned');
    // });
    // // this.autorun(() => {
    // //     console.log(this.data.todos.fetch());
    // // });
    // this.autorun(this.F);
    
    this.getTodoId = function(el) {
        const todo = $(el).parent('.js-todo');
        return todo.length == 0 ? null : todo.attr('data-id');
    };
});


Template.todos_show.helpers({
    checkedText(todo) {
        return todo && todo.checked && 'todo-list__text_checked';
    },
    checkedItem(todo) {
        return todo && todo.checked && 'todo-list__item_checked';
    },
    incompleteCount() {
        let count = 0;
        Template.instance().data.todos.forEach(el => {
            if (!el.checked) count += 1;
        });
        return count;
    },
});


Template.todos_show.events({
    'keydown input[type=text]'(event, instance) {
        if (event.which == 13) {
            const input = $(event.target);
            Meteor.call('todos.insert', {
                listId: instance.data.list._id,
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