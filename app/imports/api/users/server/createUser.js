import { Accounts } from 'meteor/accounts-base';
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

Accounts.onCreateUser((options, user) => {
    user = saveUserProfile(options, user);
    user = setUsernameIfDoesntHave(options, user);
    user = setAvatar(options, user);
    return user;
});
