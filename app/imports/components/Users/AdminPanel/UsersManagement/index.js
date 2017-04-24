import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import UsersManagement from './UsersManagement.jsx';

const composer = (props, onData) => {
    const handler = Meteor.subscribe('userData');

    if (handler.ready()) {
        const admin = Meteor.user().isAdmin;
        onData(null, {
            admin,
        });
    }
    return 0;
};

export default composeWithTracker(composer)(UsersManagement);
