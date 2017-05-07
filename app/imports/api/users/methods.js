import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import {
    setAdminSchema,
    removeAdminSchema,
} from './schema.js';


export const setAdmin = new ValidatedMethod({
    name: 'setAdmin',
    validate: setAdminSchema.validator({ clean: true }),
    run({ userId }) {
        const user = Meteor.user().isAdmin;

        if (user) {
            const doc = Meteor.users.findOne(userId);

            Meteor.users.update({ _id: doc._id }, { $set: { isAdmin: true } });
        }
    },
});

export const removeAdmin = new ValidatedMethod({
    name: 'removeAdmin',
    validate: removeAdminSchema.validator({ clean: true }),
    run({ userId }) {
        const user = Meteor.user().isAdmin;

        if (user) {
            const doc = Meteor.users.findOne(userId);
            Meteor.users.update({ _id: doc._id }, { $set: { isAdmin: false } });
        }
    },
});

