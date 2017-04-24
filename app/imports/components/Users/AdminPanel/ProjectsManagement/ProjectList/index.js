import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import {
    Projects,
} from '/imports/api/projects';

import { ProjectList } from './projectList.jsx';


const composer = (props, onData) => {
    const handler2 = Meteor.subscribe('userData');
    const handler = Meteor.subscribe('projectList');
    console.log('In Composer SingleProjectView', handler.ready());

    if (handler.ready() && handler2.ready()) {
        const projects = Projects.find({});
        const isAdmin = Meteor.users.findOne({}).isAdmin;
        console.log('In Composer SingleProjectView', handler.ready());
        console.log('In Composer SingleProjectView isAdmin', isAdmin);
        onData(null, {
            projects,
            isAdmin,
        });
    }
    return 0;
};

export default composeWithTracker(composer)(ProjectList);
