import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
// import { Accounts } from 'meteor/gwendall:auth-client-callbacks';



Accounts.onLogin(function() {
    FlowRouter.go('recipe-book');
});

Accounts.onLogout(function() {
    FlowRouter.go('home');
});

FlowRouter.triggers.enter([function(context, redirect) {
    if( ! Meteor.userId()) {
        FlowRouter.go('home');
    }
}]);

FlowRouter.route('/', {
    name: 'home',
    action() {
        if (Meteor.userId()) {
            FlowRouter.go('recipe-book');
        }
        else {
            GAnalytics.pageview();
            BlazeLayout.render('HomeLayout');
        }
    }
});

FlowRouter.route('/recipe-book', {
    name: 'recipe-book',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', { main: 'Recipes' });
    }
});

FlowRouter.route('/recipe/:id', {
    name: 'recipe',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', { main: 'RecipeSingle' });
    }
});