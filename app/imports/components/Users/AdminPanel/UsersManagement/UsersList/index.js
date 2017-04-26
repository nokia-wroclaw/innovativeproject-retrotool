import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import UsersList from './usersList.jsx';

const composer = (props, onData) => {
    const handler = Meteor.subscribe('userData');
    const callMethod = (nameOfMethod, y, z) => Meteor.call(nameOfMethod, y, z);

    if (handler.ready()) {
        const users = Meteor.users.find({});
        onData(null, {
            users,
            callMethod,
        });
    }
    return 0;
};

export default composeWithTracker(composer)(UsersList);
