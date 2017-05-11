import { setAdmin, removeAdmin } from './methods.js';

const manageAdmin = ({ _id: userId, isAdmin }) => {
    if (!isAdmin) {
        setAdmin.call({ userId });
    } else {
        removeAdmin.call({ userId });
    }
};

const actions = {
    manageAdmin,
};

export { actions };
