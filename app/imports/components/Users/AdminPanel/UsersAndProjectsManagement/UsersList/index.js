import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import UsersList from './usersList.jsx';

const composer = (props, onData) => {
    const handler = Meteor.subscribe('userList');
    const currentUserId = Meteor.userId();

    if (handler.ready()) {
        const users = Meteor.users.find({}).fetch();
        onData(null, {
            users,
            currentUserId,
        });
    }
};

export default composeWithTracker(composer)(UsersList);
