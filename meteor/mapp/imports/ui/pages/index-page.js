import './index-page.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';


Template.index_page.events({
    'click .js-remote-call'(event) {
        console.log('making http request');
        Meteor.call('call.toArms', (err, result) => {
            console.log('done');
            console.log(result);
            // document.write(result.content);
            const domain = 'http://webcad.pro';
            const href = $(result.content)[11].querySelector('a').getAttribute('href');
            console.log(href);
            $('body').append(`<a href="${domain + href}">Click me</a>`);
        });
    },
});