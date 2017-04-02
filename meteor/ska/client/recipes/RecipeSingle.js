import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Recipes } from '/collections/Recipes.js';
import './RecipeSingle.html';


Template.RecipeSingle.onCreated(function() {
    this.recipeId = FlowRouter.getParam('id');
    // this.autorun(() => {
        // this.subscribe('recipes');
    // });
    this.subscribe('singleRecipe', this.recipeId);
});

Template.RecipeSingle.helpers({
    recipe() {
        return Recipes.findOne();
    }
});