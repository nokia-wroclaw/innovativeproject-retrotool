import { Meteor } from 'meteor/meteor';

export const isAdmin = () => {
    const user = Meteor.user();
    return user && user.isAdmin;
};
