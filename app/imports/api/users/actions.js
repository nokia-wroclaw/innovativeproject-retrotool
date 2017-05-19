import { browserHistory } from 'react-router';
import {
    setAdmin,
    removeAdmin,
    setProfileName,
    setAvatar,
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

const setProfileAvatar = (service, address) =>
    new Promise((resolve, reject) => {
        setAvatar.call({ service, address }, (err, res) => {
            if (err) {
                const error = new Error(err);
                reject(error);
            }
            resolve(res);
        });
    });

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
    setProfileAvatar,
    setProfileName,
    goToProfile,
};

export { actions };
