import { browserHistory } from 'react-router';
import { setAdmin, removeAdmin } from './methods.js';

// @TODO change `isAdmin` name to sth more intuitive
const manageAdmin = ({ _id: userId, isAdmin }) => {
    if (!isAdmin) {
        setAdmin.call({ userId });
    } else {
        removeAdmin.call({ userId });
    }
};

const getUsersNames = users => users.map(
                user => user.profile.name);

const getProjectNames = projects => projects.map(
                project => project.name);

const goToAdminPanel = () => {
    browserHistory.push('/admin/main');
};

const goToProfile = () => {
    browserHistory.push('/profile');
};

const actions = {
    manageAdmin,
    getUsersNames,
    getProjectNames,
    goToAdminPanel,
    goToProfile,
};

export { actions };
