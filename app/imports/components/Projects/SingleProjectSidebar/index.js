import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import {
    Projects,
    actions as projectActions,
    isProjectModerator,
    getProjectName,
} from '/imports/api/projects';
import {
    Sprints,
    actions as sprintActions,
} from '/imports/api/sprints';
import {
    actions as postActions,
} from '/imports/api/posts';
import {
    actions as actionItemsActions,
} from '/imports/api/actionItems';
import {
    actions as workingAgreementsActions,
} from '/imports/api/workingAgreements';

import { isAdmin } from '/imports/api/users';

import SingleProjectSidebar from './SingleProjectSidebar.jsx';

const composer = ({ params: { projectId, sprintId: currentSprintId } }, onData) => {
    const projectListHandler = Meteor.subscribe('memberProjectList');
    const sprintListHandler = Meteor.subscribe('sprintList', projectId);
    const userId = Meteor.userId();

    if (projectListHandler.ready() && sprintListHandler.ready()) {
        const projectList = Projects.find({}).fetch();
        const sprintList = Sprints.find({ projectId }, { sort: { createdAt: -1 } }).fetch();

        const isCurrentUserAdmin = isAdmin();
        const canAddNewSprint = isProjectModerator(projectId, userId) || isCurrentUserAdmin;

        const selectedProjectTitle = getProjectName(projectId);

        const currentSprint = Sprints.findOne(currentSprintId);

        const user = Meteor.user();
        const { favouriteProjects = [] } = user && user.profile;
        const {
            starProject,
            unstarProject,
        } = projectActions;

        onData(null, {
            projectId,
            projects: projectList,
            sprints: sprintList,
            goToAddProject: projectActions.goToAddProject,
            goToAddSprint: sprintActions.goToAddSprint,
            goToPosts: postActions.goToPosts,
            goToProject: projectActions.goToProject,
            goToSprint: sprintActions.goToSprint,
            goToActionItems: actionItemsActions.goToActionItems,
            goToWorkingAgreements: workingAgreementsActions.goToWorkingAgreements,
            currentSprintId,
            currentSprint,
            showAddSprint: canAddNewSprint,
            showCreateLink: isCurrentUserAdmin,
            selectedProjectTitle,
            favouriteProjects,
            starProject,
            unstarProject,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(SingleProjectSidebar),
);
