import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

let num = 0;

Accounts.onCreateUser((options, user) => {
    console.log('New user created', user.services.github.username, num += 1);
    if (num === 1) {
        user.isAdmin = true;
    } else {
        user.isAdmin = false;
    }

    return user;
});


Meteor.publish('userData', () => Meteor.users.find({}));

