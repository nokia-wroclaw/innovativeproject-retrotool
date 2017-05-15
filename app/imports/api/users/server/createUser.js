import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

const saveUserProfile = (options, user) => {
    const profile = (options && options.profile) || {};
    user.profile = profile;
    return user;
};

const getAvatarUrl = (user) => {
    const githubUsername = _.get(user, 'services.github.username', undefined);
    const githubAvatar = githubUsername ? `https://github.com/${githubUsername}.png` : undefined;
    return githubAvatar || `https://api.adorable.io/avatars/128/${user._id}.png`;
};

const setAvatar = (options, user) => {
    if (user && user.profile && !user.profile.avatar) {
        user.profile.avatar = getAvatarUrl(user);
    }
    return user;
};

const setUsernameIfDoesntHave = (options, user) => {
    const { name } = user.profile;
    if (!name) {
        const { services = {} } = user;
        const serviceMatched = _.values(services).find(service => service.username || service.name);
        user.profile.name = serviceMatched && (serviceMatched.username || serviceMatched.name);
    }
    return user;
};

const setAdminOnFirstUser = (options, user) => {
    if (Meteor.users.find({}).count() > 0) {
        user.isAdmin = false;
    } else {
        user.isAdmin = true;
    }
    return user;
};

const getPublicEmail = (user) => {
    const githubEmail = {
        address: _.get(user, 'services.github.email', undefined),
        verified: true,
    };
    return githubEmail || { address: 'contact@email.com', verified: false };
};

const getPublicUsername = (user) => {
    const githubUsername = {
        serviceName: _.get(user, 'services.github.username', undefined),
        service: 'github',
    };
    return githubUsername || { serviceName: user.profile.name, service: 'none' };
};

const setPublicEmailAndUsername = (options, user) => {
    if (user && user.profile && !user.emails && !user.profile.username) {
        user.emails = getPublicEmail(user);
        user.profile.username = getPublicUsername(user);
    }
    return user;
};


Accounts.onCreateUser((options, user) => {
    user = saveUserProfile(options, user);
    user = setAdminOnFirstUser(options, user);
    user = setUsernameIfDoesntHave(options, user);
    user = setAvatar(options, user);
    user = setPublicEmailAndUsername(options, user);
    return user;
});
