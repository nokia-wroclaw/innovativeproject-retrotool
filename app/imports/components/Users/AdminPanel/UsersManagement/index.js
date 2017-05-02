import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import UsersManagement from './UsersManagement.jsx';

const composer = (props, onData) => {
    const handler = Meteor.subscribe('userData');

    if (handler.ready()) {
        const isAdmin = Meteor.user().isAdmin;
        onData(null, {
            isAdmin,
        });
    }
    return undefined;
};

export default composeWithTracker(composer)(UsersManagement);
