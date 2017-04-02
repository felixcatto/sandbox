import { Template } from 'meteor/templating';
import { Recipes } from '/collections/Recipes.js';
import './Menu.html';



Template.Menu.onCreated(function() {
    this.subscribe('recipes');
});

Template.Menu.helpers({
    recipes() {
        return Recipes.find({ inMenu: true });
    }
});