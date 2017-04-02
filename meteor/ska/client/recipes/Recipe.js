import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import './Recipe.html';



Template.Recipe.onCreated(function() {
    this.editMode = new ReactiveVar(false);
});

Template.Recipe.helpers({
    updateRecipeId() {
        return Template.instance().data.recipe._id;
    },
    editMode() {
        return Template.instance().editMode.get();
    }
});

Template.Recipe.events({
    'click .toggle-menu'(event, instance) {
        const recipe = instance.data.recipe;
        Meteor.call('toggleMenuItem', recipe._id, recipe.inMenu)
    },
    'click .fa-trash'(event, instance) {
        const recipe = instance.data.recipe;
        Meteor.call('deleteRecipe', recipe._id);
    },
    'click .fa-pencil'(event, instance) {
        instance.editMode.set(true);
    },
    'click [type=submit]'(event, instance) {
        instance.editMode.set(false);
    },
});