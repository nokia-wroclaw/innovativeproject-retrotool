import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    Projects,
} from '/imports/api/projects';

import ProjectList from './ProjectList.jsx';

const goToProject = (router, projectId) => router.push(`/project/${projectId}`);

const composer = ({ router }, onData) => {
    const projectsHandler = Meteor.subscribe('projectList');

    if (projectsHandler.ready()) {
        const projects = Projects.find({}).fetch();

        onData(null, {
            projects,
            onTouchTap: goToProject.bind(null, router),
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(ProjectList),
);
