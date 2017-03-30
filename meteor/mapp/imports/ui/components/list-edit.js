import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Lists } from '/imports/api/lists/lists.js';
import './list-edit.html';



Template.list_edit.onCreated(function() {
    this.subscribe('lists');

    this.autorun(() => {
        if (this.subscriptionsReady()) {
            this.list = Lists.findOne({ _id: FlowRouter.getParam('id') });
        }
    });
});


Template.list_edit.helpers({
    listName() {
        return Template.instance().list.name;
    },
});


Template.list_edit.events({
    'keydown input[type=text]'(event, instance) {
        if (event.which == 13) {
            const input = event.target;
            Meteor.call('lists.updateName', instance.list._id, input.value);
            input.setAttribute('placeholder', input.value);
            input.value = '';
            input.blur();
        }
    },
});