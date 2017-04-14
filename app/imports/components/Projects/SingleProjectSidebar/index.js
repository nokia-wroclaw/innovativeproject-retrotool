import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    Projects,
    actions as projectActions,
} from '/imports/api/projects';
<<<<<<< HEAD

=======
>>>>>>> origin/devel
import {
    Sprints,
    actions as sprintActions,
} from '/imports/api/sprints';
<<<<<<< HEAD

import SingleProjectSidebar from './SingleProjectSidebar.jsx';

const composer = ({ params: { projectId } }, onData) => {
=======
import {
    actions as postActions,
} from '/imports/api/posts';

import SingleProjectSidebar from './SingleProjectSidebar.jsx';

const composer = ({ params: { projectId, sprintId } }, onData) => {
>>>>>>> origin/devel
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
<<<<<<< HEAD
            goToAddSprint: sprintActions.goToAddSprint,
=======
            goToSprint: sprintActions.goToSprint,
            goToAddSprint: sprintActions.goToAddSprint,
            goToPosts: postActions.goToPosts,
            sprintId,
>>>>>>> origin/devel
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(SingleProjectSidebar),
);
