import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import {
    Projects,
} from '/imports/api/projects';

import { ProjectList } from './projectList.jsx';


const composer = (props, onData) => {
    const handler = Meteor.subscribe('userData');
    const handler2 = Meteor.subscribe('projectList');

    if (handler.ready() && handler2.ready()) {
        const projects = Projects.find({});
        const isAdmin = Meteor.user().isAdmin;
        onData(null, {
            projects,
            isAdmin,
        });
    }
    return undefined;
};

export default composeWithTracker(composer)(ProjectList);
