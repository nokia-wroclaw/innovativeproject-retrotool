import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';


Accounts.onCreateUser((options, newUser) => {
    const anyUser = Meteor.users.find({}).count();

    if (anyUser > 0) {
        newUser.isAdmin = false;
    } else {
        newUser.isAdmin = true;
    }

    return newUser;
});

Meteor.methods({
    setAdmin(userId) {
        check(userId, String);

        const admin = Meteor.user().isAdmin;

        if (admin) {
            const doc = Meteor.users.findOne({ _id: userId });

            if (Meteor.isServer) {
                Meteor.users.update({ _id: doc._id }, { $set: { isAdmin: true } });
            }
        }
    },
    remAdmin(userId) {
        check(userId, String);

        const admin = Meteor.user().isAdmin;

        if (admin) {
            const doc = Meteor.users.findOne({ _id: userId });
            if (Meteor.isServer) {
                Meteor.users.update({ _id: doc._id }, { $set: { isAdmin: false } });
            }
        }
    },
});

Meteor.publish('userData',
() => Meteor.users.find({}, { fields: { isAdmin: 1, 'services.github.username': 1 } }));
