import { Meteor } from 'meteor/meteor';
import { Recipes } from '/collections/Recipes.js';



Meteor.publish('recipes', () => {
    return Recipes.find();
});
