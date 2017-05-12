import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import AdminPanel from './AdminPanel.jsx';

const composer = (props, onData) => {
    const { isAdmin = false } = Meteor.user();

    onData(null, {
        isAdmin,
    });
};

export default composeWithTracker(composer)(AdminPanel);
