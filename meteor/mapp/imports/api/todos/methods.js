import { Meteor } from 'meteor/meteor';
import { Todos } from './todos.js';


Meteor.methods({
    'todos.insert'(todo) {
        Todos.insert(todo);
    },
    'todos.remove'(taskId) {
        Todos.remove(taskId);
    },
    'todos.setChecked'(taskId, setChecked) {
        Todos.update(taskId, { $set: { checked: setChecked } });
    },
});