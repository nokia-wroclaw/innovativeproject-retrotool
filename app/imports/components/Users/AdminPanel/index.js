import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Panel from './Panel.jsx';


const composer = (props, onData) => {
    console.log('admin');

    const handler = Meteor.subscribe('userData');

    if (handler.ready()) {
        const admin = Meteor.users.findOne({}).isAdmin;
        console.log('in composer', admin);
        onData(null, {
            admin,
        });
    }

    onData(null, {});
};

export default composeWithTracker(composer)(Panel);
