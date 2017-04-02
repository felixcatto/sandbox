import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var'
import { Recipes } from '/collections/Recipes.js';



Template.NewRecipe.events({
    'click .fa-close'(event, instance) {
        instance.data.closeForm();
    }
});