import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import {
    Projects,
    actions,
} from '/imports/api/projects';

import ProjectList from './ProjectList.jsx';

const {
    goToProject,
} = actions;

const composer = (props, onData) => {
    const projectsHandler = Meteor.subscribe('projectList');

    if (projectsHandler.ready()) {
        const projects = Projects.find({}).fetch();

        onData(null, {
            projects,
            onTouchTap: goToProject,
        });
    }
};

export default composeWithTracker(
    composer,
)(ProjectList);
