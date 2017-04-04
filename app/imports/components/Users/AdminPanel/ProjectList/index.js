import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import {
    Projects,
} from '/imports/api/projects';

import { ListOfProjects } from './projectList.jsx';


const composer = (props, onData) => {
    const projectsHandler = Meteor.subscribe('projectList');

    if (projectsHandler.ready()) {
        const projects = Projects.find({}).fetch();
        onData(null, {
            projects,
        });
    }
};

export default composeWithTracker(composer)(ListOfProjects);
