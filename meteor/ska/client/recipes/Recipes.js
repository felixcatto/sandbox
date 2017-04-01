import { Template } from 'meteor/templating';
import { Recipes } from '/collections/Recipes.js';

Template.Recipes.onCreated(function() {
    this.subscribe('recipes');
});

Template.Recipes.helpers({
    recipes() {
        return Recipes.find();
    },
    recipesCollection() {
        return Recipes;
    }
});