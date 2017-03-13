import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    Projects,
    actions as projectActions,
} from '/imports/api/projects';

import {
    actions as sprintActions,
} from '/imports/api/sprints';

import SingleProjectSidebar from './SingleProjectSidebar.jsx';

const composer = ({ params: { projectId } }, onData) => {
    const projectListHandler = Meteor.subscribe('projectList');

    if (projectListHandler.ready()) {
        const projectList = Projects.find({}).fetch();

        onData(null, {
            projectId,
            projects: projectList,
            goToProject: projectActions.goToProject,
            goToAddSprint: sprintActions.goToAddSprint,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(SingleProjectSidebar),
);
