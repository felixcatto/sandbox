import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';



export const Recipes = new Mongo.Collection('recipes');
Recipes.allow({
    insert: function(userId, doc) {
        return !!userId;
    }
});
const Ingredient = new SimpleSchema({
    name: {
        type: String
    },
    amount: {
        type: String
    }
});
const RecipeSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    desc: {
        type: String,
        label: 'Description'
    },
    ingredients: {
        type: [Ingredient]
    },
    inMenu: {
        type: Boolean,
        defaultValue: false,
        optional: true,
        autoform: {
            type: 'hidden'
        }
    },
    author: {
        type: String,
        label: 'Author',
        autoValue() {
            return this.userId;
        },
        autoform: {
            type: 'hidden'
        }
    },
    createdAt: {
        type: Date,
        label: 'Created At',
        autoValue() {
            return new Date();
        },
        autoform: {
            type: 'hidden'
        }
    }
});
Recipes.attachSchema(RecipeSchema);




// author: {
//     type: String,
//     label: "Author",
//     autoValue: function(){
//         return this.userId;
//     },
//     autoform: {
//         afFieldInput: {
//             type: "hidden"
//         },
//         afFormGroup: {
//             label: false
//         }
//     }
// },
// createdAt: {
//     type: Date,
//     label: "CreatedAt",
//     autoValue: function() {
//         return new Date();
//     },
//     autoform: {
//         afFieldInput: {
//             type: "hidden"
//         },
//         afFormGroup: {
//             label: false
//         }
//     },
// }