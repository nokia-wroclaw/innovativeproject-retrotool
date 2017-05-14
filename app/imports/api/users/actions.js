import { browserHistory } from 'react-router';
import {
    setAdmin,
    removeAdmin,
    setProfileName,
    setGravatarAvatar,
    setGithubAvatar,
} from './methods.js';

// @TODO change `isAdmin` name to sth more intuitive
const manageAdmin = ({ _id: userId, isAdmin }) => {
    if (!isAdmin) {
        setAdmin.call({ userId });
    } else {
        removeAdmin.call({ userId });
    }
};

const changeProfileName = name =>
    new Promise((resolve, reject) => {
        setProfileName.call({ name }, (err, res) => {
            if (err) {
                const error = new Error(err);
                reject(error);
            }
            resolve(res);
        });
    });

const setGravatarPhoto = () => {
    setGravatarAvatar.call({});
};

const setGithubPhoto = () => {
    setGithubAvatar.call({});
};

const goToAdminPanel = () => {
    browserHistory.push('/admin/main');
};

const goToProfile = () => {
    browserHistory.push('/profile');
};

const actions = {
    manageAdmin,
    changeProfileName,
    goToAdminPanel,
    setGravatarPhoto,
    setGithubPhoto,
    setProfileName,
    goToProfile,
};

export { actions };
