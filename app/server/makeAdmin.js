import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


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
    removeAdmin(userId) {
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
() => Meteor.users.find({}, { fields: { isAdmin: 1, profile: 1 } }));
