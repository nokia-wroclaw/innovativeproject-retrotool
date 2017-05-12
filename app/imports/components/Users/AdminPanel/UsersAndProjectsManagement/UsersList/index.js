import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import UsersList from './UsersList.jsx';

const composer = (props, onData) => {
    const handler = Meteor.subscribe('userList');

    if (handler.ready()) {
        const users = Meteor.users.find({}).fetch();
        onData(null, {
            users,
        });
    }
};

export default composeWithTracker(composer)(UsersList);
