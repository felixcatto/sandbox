import { Meteor } from 'meteor/meteor';
import { Todos } from '../todos.js';



Meteor.publish('todos', function() {
    return Todos.find();
});