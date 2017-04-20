import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import {
    Projects,
} from '/imports/api/projects';

import { ProjectList } from './projectList.jsx';


const composer = (props, onData) => {
    const projectsHandler = Meteor.subscribe('projectList');
    console.log('ProjectList composer', projectsHandler.ready());
    if (projectsHandler.ready()) {
        const projects = Projects.find({}).fetch();
        console.log(projects);
        onData(null, {
            projects,
        });
    }
};

export default composeWithTracker(composer)(ProjectList);
