import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var'
import { Recipes } from '/collections/Recipes.js';

Template.Recipes.onCreated(function() {
    this.subscribe('recipes');
    this.addNewRecipeMode = new ReactiveVar(false);
});

Template.Recipes.helpers({
    recipes() {
        return Recipes.find();
    },
    recipesCollection() {
        return Recipes;
    },
    addNewRecipeMode() {
        return Template.instance().addNewRecipeMode.get();
    },
    closeForm() {
        const instance = Template.instance();
        return () => {
            instance.addNewRecipeMode.set(false);
        };
    }
});

Template.Recipes.events({
    'click .js-add-recipe'(event, instance) {
        instance.addNewRecipeMode.set(true);
    }
});