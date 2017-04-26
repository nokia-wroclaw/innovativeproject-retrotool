import { Meteor } from 'meteor/meteor';

const callMethod = (nameOfMethod, userId) => Meteor.call(nameOfMethod, userId);

const setAdmin = (user) => {
    if (!user.isAdmin) {
        callMethod('setAdmin', user._id);
    } else {
        callMethod('remAdmin', user._id);
    }
};

const actions = {
    setAdmin,
};


export { actions };
