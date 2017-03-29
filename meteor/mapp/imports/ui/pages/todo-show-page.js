import { Template } from 'meteor/templating';
import { Todos } from '../../api/todos/todos.js';
import './todo-show-page.html';
import '../components/todo-show.js';



Template.todo_show_page.onCreated(function() {
    console.log('something work');
    this.subscribe('todos');
});


Template.todo_show_page.helpers({
    todos() {
        return Todos.find();
    },
});