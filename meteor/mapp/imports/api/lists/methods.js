import { Meteor } from 'meteor/meteor';
import { Lists } from './lists.js';



Meteor.methods({
    'lists.insert'(listName) {
        Lists.insert({name: listName});
    },
    'lists.remove'(listId) {
        Lists.remove(listId);
    },
    'lists.updateName'(listId, listNewName) {
        Lists.update(listId, {
            $set: { name: listNewName }
        });
    },
});