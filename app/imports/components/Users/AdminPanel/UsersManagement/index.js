import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import UsersManagement from './UsersManagement.jsx';

const composer = (props, onData) => {
    const handler = Meteor.subscribe('userData');
    console.log('In Composer users22222', handler.ready());

    if (handler.ready()) {
        const admin = Meteor.user().isAdmin;
        console.log('In Composer 2222222 users', handler.ready());
        onData(null, {
            admin,
        });
    }
    return 0;
};

export default composeWithTracker(composer)(UsersManagement);
