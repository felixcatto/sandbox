import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './lists.html';



Template.lists.onCreated(function() {
    this.getListId = function(el) {
        const item = $(el).parent('.js-list');
        return item.length == 0 ? null : item.attr('data-id');
    };
});


Template.lists.events({
    'keydown input[type=text]'(event) {
        if (event.which == 13) {
            const input = event.target;
            Meteor.call('lists.insert', input.value);
            input.value = '';
        }
    },
    'click .js-remove-list'(event, instance) {
        const id = instance.getListId(event.target);
        Meteor.call('lists.remove', id);
    },
    'click .js-edit-list'(event, instance) {
        const id = instance.getListId(event.target);
        // console.log('sorry, this is doesn\'t work now :\'(')
        // Meteor.call('lists.remove', id);
    },
});