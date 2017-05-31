import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { FullPageLoader } from '/imports/components/Loaders';
import {
    Projects,
    isProjectModerator,
} from '/imports/api/projects';

import SingleProject from './SingleProject.jsx';

const composer = ({ params: { projectId } }, onData) => {
    const projectsHandler = Meteor.subscribe('singleProject', projectId);
    const usersHandler = Meteor.subscribe('userList', projectId);

    if (projectsHandler.ready() && usersHandler.ready()) {
        const users = Meteor.users.find().fetch();
        const moderators = users.filter(moderator => isProjectModerator(projectId, moderator._id));
        const members = users.filter(member => !isProjectModerator(projectId, member._id));
        const userList = moderators.concat(members);

        const project = Projects.findOne({ _id: projectId });

        onData(null, {
            projectId,
            name: project && project.name,
            userList,
            isProjectModerator,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(SingleProject),
);
