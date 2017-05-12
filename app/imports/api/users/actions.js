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

const goToAdminPanel = () => {
    browserHistory.push('/admin/main');
};

const goToProfile = () => {
    browserHistory.push('/profile');
};

const actions = {
    manageAdmin,
    goToAdminPanel,
    goToProfile,
};

export { actions };
