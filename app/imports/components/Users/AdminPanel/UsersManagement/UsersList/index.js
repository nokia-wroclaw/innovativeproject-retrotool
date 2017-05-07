import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import UsersList from './usersList.jsx';

const composer = (props, onData) => {
    const handler = Meteor.subscribe('userData');

    if (handler.ready()) {
        const users = Meteor.users.find({});
        onData(null, {
            users,
        });
    }
    return undefined;
};

export default composeWithTracker(composer)(UsersList);
