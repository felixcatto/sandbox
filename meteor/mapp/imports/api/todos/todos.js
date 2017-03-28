import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Todos = new Mongo.Collection('todos');



Todos.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    text: { type: String },
    checked: { type: Boolean },
    createdAt: {type: Date },
});

Todos.attachSchema(Todos.schema);