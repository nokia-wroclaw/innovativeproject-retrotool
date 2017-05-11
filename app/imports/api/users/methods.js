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
        const { isAdmin } = Meteor.user();
        if (isAdmin) {
            Meteor.users.update(userId, { $set: { isAdmin: true } });
        }
    },
});

export const removeAdmin = new ValidatedMethod({
    name: 'removeAdmin',
    validate: removeAdminSchema.validator({ clean: true }),
    run({ userId }) {
        const user = Meteor.user().isAdmin;
        if (user) {
            Meteor.users.update(userId, { $set: { isAdmin: false } });
        }
    },
});

