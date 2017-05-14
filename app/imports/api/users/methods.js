import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import {
    setAdminSchema,
    removeAdminSchema,
    setNameSchema,
} from './schema.js';


export const setAdmin = new ValidatedMethod({
    name: 'users.setAdmin',
    validate: setAdminSchema.validator({ clean: true }),
    run({ userId }) {
        const user = Meteor.user();
        if (user && user.isAdmin) {
            return Meteor.users.update(userId, { $set: { isAdmin: true } });
        }

        throw new Meteor.Error(
            'no-permissions-to-set-admin',
            'You do not have permission to set admin',
        );
    },
});

export const removeAdmin = new ValidatedMethod({
    name: 'users.removeAdmin',
    validate: removeAdminSchema.validator({ clean: true }),
    run({ userId }) {
        const user = Meteor.user();
        if (user && user.isAdmin) {
            return Meteor.users.update(userId, { $set: { isAdmin: false } });
        }

        throw new Meteor.Error(
            'no-permissions-to-remove-admin',
            'You do not have permission to remove admin',
        );
    },
});

export const setProfileName = new ValidatedMethod({
    name: 'users.setName',
    validate: setNameSchema.validator({ clean: true }),
    run({ name }) {
        const userId = Meteor.userId();

        if (userId) {
            return Meteor.users.update(userId, {
                $set: {
                    'profile.name': name,
                },
            });
        }
        return this.ready();
    },
});
