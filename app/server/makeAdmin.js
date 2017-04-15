import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

let num = 0; // to fix

Accounts.onCreateUser((options, user) => {
    console.log('New user created', user.services.github.username, num += 1);
    if (num === 1) {
        user.isAdmin = true;
    } else {
        user.isAdmin = false;
    }

    user.isBanned = false;

    return user;
});

Meteor.methods({
    setAdmin(userId, adminId) {
        const admin = Meteor.users.findOne({ _id: adminId });
        const user = Meteor.users.findOne({ _id: userId });

        if (admin.isAdmin) {
            console.log('set admin: ', user.services.github.username);
            const doc = Meteor.users.findOne({ _id: userId });
            if (Meteor.isServer) { Meteor.users.update({ _id: doc._id }, { $set: { isAdmin: true } }); }
            console.log('update user ', user.services.github.username);
        } else {
            console.log(adminId, 'Tried to get acces to the admin, Calling Police');
        }
    },
    remAdmin(userId, adminId) {
        const admin = Meteor.users.findOne({ _id: adminId });
        const user = Meteor.users.findOne({ _id: userId });

        if (admin.isAdmin) {
            console.log('rem admin: ', user.services.github.username);
            const doc = Meteor.users.findOne({ _id: userId });
            if (Meteor.isServer) {
                Meteor.users.update({ _id: doc._id }, { $set: { isAdmin: false } });
                console.log('update user ', user.services.github.username);
            }
        } else {
            console.log(adminId, 'Tried to get acces to the admin, Calling Police');
        }
    },
});

Meteor.publish('userData', () => Meteor.users.find({}, { fields: { isAdmin: 1, 'services.github.username': 1 } }));
