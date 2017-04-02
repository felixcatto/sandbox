import { Template } from 'meteor/templating';
import { Recipes } from '/collections/Recipes.js';
import './ShoppingList.html';



Template.ShoppingList.onCreated(function() {
    this.subscribe('recipes');
});

Template.ShoppingList.helpers({
    shoppingList() {
        return Recipes.find({ inMenu: true });
    }
});