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
        if (Meteor.users.findOne({ _id: adminId }).isAdmin) {
            console.log('set admin:', Meteor.users.find({ _id: userId }).fetch());
            const doc = Meteor.users.findOne({ _id: userId });
            console.log(doc._id);
            if (Meteor.isServer) { Meteor.users.update({ _id: doc._id }, { $set: { isAdmin: true } }); }
            console.log('update user', Meteor.users.find({ _id: userId }).fetch());
        } else {
            console.log(adminId, 'Tried to get acces to the admin, Calling Police');
        }
    },
    remAdmin(userId, adminId) {
        if (Meteor.users.findOne({ _id: adminId }).isAdmin) {
            console.log('rem admin:', Meteor.users.find({ _id: userId }).fetch());
            const doc = Meteor.users.findOne({ _id: userId });
            console.log(doc._id);
            if (Meteor.isServer) { Meteor.users.update({ _id: doc._id }, { $set: { isAdmin: false } }); console.log('update user', Meteor.users.find({ _id: userId }).fetch()); }
        } else {
            console.log(adminId, 'Tried to get acces to the admin, Calling Police');
        }
    },
});

Meteor.publish('userData', () => Meteor.users.find({}));
