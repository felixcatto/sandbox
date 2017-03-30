import { Template } from 'meteor/templating';
import { Lists } from '/imports/api/lists/lists.js';
import './lists-page.html';
import '/imports/ui/components/lists.js';



Template.lists_page.onCreated(function() {
    this.subscribe('lists');
});


Template.lists_page.helpers({
    listsCursor() {
        return Lists.find();
    },
});
