import { Meteor } from 'meteor/meteor';
import md5 from 'md5';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import {
    setAdminSchema,
    removeAdminSchema,
    setNameSchema,
    setAvatarSchema,
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
        return undefined;
    },
});

export const setAvatar = new ValidatedMethod({
    name: 'users.setAvatar',
    validate: setAvatarSchema.validator({ clean: true }),
    run({ service, address }) {
        const user = Meteor.user();
        const userId = user._id;

        if (address && service === 'gravatar') {
            const emailHash = md5(address);

            return Meteor.users.update(userId, {
                $set: {
                    'profile.avatar': `https://s.gravatar.com/avatar/${emailHash}`,
                },
            });
        }
        if (user.services.github && service === 'github') {
            const username = user.services.github.username;

            return Meteor.users.update(userId, {
                $set: {
                    'profile.avatar': `https://github.com/${username}.png`,
                },
            });
        }
        return undefined;
    },
});
