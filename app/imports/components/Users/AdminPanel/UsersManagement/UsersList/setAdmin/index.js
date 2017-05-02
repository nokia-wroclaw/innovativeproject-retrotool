import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import SetAdmin from './setAdmin.jsx';

const composer = (props, onData) => {
    const handler = Meteor.subscribe('userData');
    let users;

    if (handler.ready()) {
        users = Meteor.users.find({}).fetch();
        onData(null, {
            users,
        });
    }
    return 0;
};

export default composeWithTracker(composer)(SetAdmin);
