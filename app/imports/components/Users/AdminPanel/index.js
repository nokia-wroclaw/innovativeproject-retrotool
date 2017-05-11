import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Panel from './Panel.jsx';

const composer = (props, onData) => {
    const isAdmin = Meteor.user().isAdmin;
    onData(null, {
        isAdmin,
    });
};
export default composeWithTracker(composer)(Panel);
