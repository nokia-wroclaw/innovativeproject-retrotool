import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    Projects,
    actions as projectActions,
} from '/imports/api/projects';

import {
    Sprints,
    actions as sprintActions,
} from '/imports/api/sprints';

import SingleProjectSidebar from './SingleProjectSidebar.jsx';

const composer = ({ params: { projectId } }, onData) => {
    const projectListHandler = Meteor.subscribe('projectList');
    const sprintListHandler = Meteor.subscribe('sprintList', projectId);

    if (projectListHandler.ready() && sprintListHandler.ready()) {
        const projectList = Projects.find({}).fetch();
        const sprintList = Sprints.find({}).fetch();

        onData(null, {
            projectId,
            projects: projectList,
            sprints: sprintList,
            goToProject: projectActions.goToProject,
            goToSprint: sprintActions.goToSprint,
            goToAddSprint: sprintActions.goToAddSprint,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(SingleProjectSidebar),
);
