import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import {
    Projects,
} from '/imports/api/projects';

import ProjectsManagement from './ProjectsManagement.jsx';

const composer = (props, onData) => {
    const handler2 = Meteor.subscribe('userData');
    const handler = Meteor.subscribe('projectList');
    console.log('In Composer projects', handler.ready());

    if (handler.ready() && handler2.ready()) {
        const projects = Projects.find({}).fetch();
        const isAdmin = Meteor.users.findOne({}).isAdmin;
        console.log('In Composer projects', handler.ready());
        console.log('In Composer projects isAdmin', isAdmin);
        onData(null, {
            projects,
            isAdmin,
        });
    }
    return 0;
};

export default composeWithTracker(composer)(ProjectsManagement);
