import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import {
    Projects,
    actions as projectActions,
    isProjectModerator,
} from '/imports/api/projects';
import {
    Sprints,
    actions as sprintActions,
} from '/imports/api/sprints';
import {
    actions as postActions,
} from '/imports/api/posts';
import { isAdmin } from '/imports/api/users';

import SingleProjectSidebar from './SingleProjectSidebar.jsx';

const composer = ({ params: { projectId, sprintId: currentSprintId } }, onData) => {
    const projectListHandler = Meteor.subscribe('projectList');
    const sprintListHandler = Meteor.subscribe('sprintList', projectId);
    const userId = Meteor.userId();

    if (projectListHandler.ready() && sprintListHandler.ready()) {
        const projectList = Projects.find({}).fetch();
        const sprintList = Sprints.find({}).fetch();

        const canAddNewSprint = isProjectModerator(projectId, userId) || isAdmin();

        onData(null, {
            projectId,
            projects: projectList,
            sprints: sprintList,
            goToAddProject: projectActions.goToAddProject,
            goToAddSprint: sprintActions.goToAddSprint,
            goToPosts: postActions.goToPosts,
            goToProject: projectActions.goToProject,
            goToSprint: sprintActions.goToSprint,
            currentSprintId,
            showAddSprint: canAddNewSprint,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(SingleProjectSidebar),
);
