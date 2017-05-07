import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import SetAdmin from './setAdmin.jsx';

const composer = (props, onData) => {
    const handler = Meteor.subscribe('userList');

    if (handler.ready()) {
        const users = Meteor.users.find({}).fetch();
        onData(null, {
            users,
        });
    }
};

export default composeWithTracker(composer)(SetAdmin);
