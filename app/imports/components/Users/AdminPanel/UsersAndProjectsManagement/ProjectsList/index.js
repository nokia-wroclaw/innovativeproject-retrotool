import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import {
    Projects,
} from '/imports/api/projects';

import ProjectsList from './projectsList.jsx';


const composer = (props, onData) => {
    const projectDataHandler = Meteor.subscribe('projectList');

    if (projectDataHandler.ready()) {
        const projects = Projects.find({}).fetch();
        onData(null, {
            projects,
        });
    }
};

export default composeWithTracker(composer)(ProjectsList);
