import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import './lists.html';



Template.lists.onCreated(function() {
    this.editingId = new ReactiveVar(null);
    this.getListId = function(el) {
        const item = $(el).parents('.js-list');
        return item.length == 0 ? null : item.attr('data-id');
    };
});


Template.lists.helpers({
    editing(list) {
        return Template.instance().editingId.get() == list._id;
    },
});


Template.lists.events({
    'keydown .js-add-list'(event) {
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
        Template.instance().editingId.set(id);
        Tracker.flush();
        instance.$('.js-edit-input').focus();
    },
    'keydown .js-edit-input'(event, instance) {
        if (event.which == 13) {
            const input = event.target;
            Meteor.call('lists.updateName', instance.getListId(input), input.value);
            Template.instance().editingId.set(null);
        }
        else if (event.which == 27) {
            Template.instance().editingId.set(null);
        }
    },
});