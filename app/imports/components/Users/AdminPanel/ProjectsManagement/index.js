import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import ProjectsManagement from './ProjectsManagement.jsx';

const composer = (props, onData) => {
    const handler2 = Meteor.subscribe('userData');

    if (handler2.ready()) {
        const isAdmin = Meteor.user().isAdmin;
        onData(null, {
            isAdmin,
        });
    }
    return 0;
};

export default composeWithTracker(composer)(ProjectsManagement);
