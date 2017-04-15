import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';



Meteor.methods({
    'call.toArms': () => {
        // const result = HTTP.call('GET', 'https://ya.ru');
        const result = HTTP.call('POST', 'http://webcad.pro/cgi/vnc_sec/enter.cgi', {
            params: {
                t1:1500000.0,
                t2:1000000.0,
                t3:260000.0,
                t4:40.0,
                t5:50.0,
                t6:5.0,
                t7:5.0,
                t8:16.09,
                t9:16.09,
                t10:25,
                t11:'A400',
            }
        });
        return result;
    },
});