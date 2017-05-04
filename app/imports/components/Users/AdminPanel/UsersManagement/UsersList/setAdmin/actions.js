import { Meteor } from 'meteor/meteor';

const callMethod = (nameOfMethod, userId) => Meteor.call(nameOfMethod, userId);

const setAdmin = (user) => {
    if (!user.isAdmin) {
        callMethod('setAdmin', user._id);
    } else {
        callMethod('removeAdmin', user._id);
    }
};

const getIndexOfUserById = (collection, id) => {
    for (let i = 0; i <= collection.length; i += 1) {
        if (collection[i]._id === id) { return i; }
    }
    return -1;
};

const actions = {
    setAdmin,
    getIndexOfUserById,
};

export { actions };
