import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import md5 from 'md5';
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
        return undefined;
    },
});

export const setGravatarAvatar = new ValidatedMethod({
    name: 'users.setGravatar',
    validate: new SimpleSchema({}).validator({}),
    run() {
        const user = Meteor.user();

        if (user) {
            const userId = user._id;
            const email = user.emails[0].address;
            const emailHash = md5(email);

            return Meteor.users.update(userId, {
                $set: {
                    'profile.avatar': `https://s.gravatar.com/avatar/${emailHash}`,
                },
            });
        }
        return undefined;
    },
});

export const setGithubAvatar = new ValidatedMethod({
    name: 'users.setGithubAvatar',
    validate: new SimpleSchema({}).validator({}),
    run() {
        const user = Meteor.user();

        if (user.profile.username.service === 'github') {
            const userId = user._id;
            const username = user.profile.username.serviceName;

            return Meteor.users.update(userId, {
                $set: {
                    'profile.avatar': `https://github.com/${username}.png`,
                },
            });
        }
        return undefined;
    },
});
