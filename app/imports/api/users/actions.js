import { setAdmin, removeAdmin } from './methods.js';

const manageAdmin = (user) => {
    const userId = { userId: user._id };
    if (!user.isAdmin) {
        setAdmin.call(userId);
    } else {
        removeAdmin.call(userId);
    }
};

const getIndexOfUserById = (collection, id) => {
    for (let i = 0; i <= collection.length; i += 1) {
        if (collection[i]._id === id) { return i; }
    }
    return -1;
};

const actions = {
    manageAdmin,
    getIndexOfUserById,
};

export { actions };
