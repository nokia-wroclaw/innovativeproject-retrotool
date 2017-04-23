import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

export const isAdmin = (userId) => {
    const user = userId ?
            Meteor.users.findOne(userId)
        :
            Meteor.user();
    return user && !!user.isAdmin;
};

export const isLoggedIn = () => !!Meteor.userId();

export const onLogOut = () => Meteor.logout(() => {
    browserHistory.push('/');
});
