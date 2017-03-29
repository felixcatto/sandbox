import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Lists = new Mongo.Collection('lists');



Lists.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    name: { type: String },
});

Lists.attachSchema(Lists.schema);