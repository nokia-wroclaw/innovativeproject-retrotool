import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Panel from './Panel.jsx';

const composer = (props, onData) => {
    const handler = Meteor.subscribe('userData');

    if (handler.ready()) {
        const isAdmin = Meteor.user().isAdmin;
        onData(null, {
            isAdmin,
        });
    }
    return 0;
};
export default composeWithTracker(composer)(Panel);