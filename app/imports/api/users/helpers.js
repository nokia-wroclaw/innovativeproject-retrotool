import { Meteor } from 'meteor/meteor';

export const isAdmin = (userId) => {
    const user = userId ?
            Meteor.users.findOne(userId)
        :
            Meteor.user();
    return user && !!user.isAdmin;
};
