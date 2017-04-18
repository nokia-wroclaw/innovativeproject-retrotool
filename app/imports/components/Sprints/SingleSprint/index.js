import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    Sprints,
    actions as sprintActions,
} from '/imports/api/sprints';

import { Projects, isProjectModerator } from '/imports/api/projects';

import SingleSprint from './SingleSprint.jsx';


const composer = ({ params: { sprintId } }, onData) => {
    const sprintHandler = Meteor.subscribe('singleSprint', sprintId);


    if (sprintHandler.ready()) {
        const sprint = Sprints.findOne({ _id: sprintId });

        const projectId = sprint.projectId;
        const projectsHandler = Meteor.subscribe('singleProject', projectId);


        if (projectsHandler.ready()) {
            const project = Projects.findOne({ _id: projectId });
            const userId = Meteor.userId();
            const canClose = isProjectModerator(project, userId);

            onData(null, {
                sprint,
                toggleSprint: sprintActions.toggleSprint,
                canClose,
                userId,
                project,
            });
        }
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(SingleSprint),
);
