import { setAdmin, removeAdmin } from './methods.js';

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


const actions = {
    manageAdmin,
    getUsersNames,
    getProjectNames,
};

export { actions };
