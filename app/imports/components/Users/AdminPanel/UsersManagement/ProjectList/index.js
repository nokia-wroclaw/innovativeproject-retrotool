import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import {
    Projects,
} from '/imports/api/projects';

import { ProjectList } from './projectList.jsx';


const composer = (props, onData) => {
    const userDataHandler = Meteor.subscribe('userList');
    const projectDataHandler = Meteor.subscribe('projectList');

    if (userDataHandler.ready() && projectDataHandler.ready()) {
        const projects = Projects.find({}).fetch();
        const isAdmin = Meteor.user().isAdmin;
        onData(null, {
            projects,
            isAdmin,
        });
    }
};

export default composeWithTracker(composer)(ProjectList);
