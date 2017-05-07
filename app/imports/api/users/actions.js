import { setAdmin, removeAdmin } from './methods.js';

const manageAdmin = (user) => {
    const userId = { userId: user._id };
    if (!user.isAdmin) {
        setAdmin.call(userId);
    } else {
        removeAdmin.call(userId);
    }
};

const actions = {
    manageAdmin,
};

export { actions };
