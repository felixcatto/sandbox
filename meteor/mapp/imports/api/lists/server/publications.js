import { Meteor } from 'meteor/meteor';
import { Lists } from '../lists.js';



Meteor.publish('lists', function(){
    return Lists.find();
});