import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import { FullPageLoader } from '/imports/components/Loaders';
import {
    Projects,
    isProjectModerator,
    actions,
} from '/imports/api/projects';
import ProjectMembers from './ProjectMembers.jsx';


const composer = ({ projectId }, onData) => {
    const projectsHandler = Meteor.subscribe('singleProject', projectId);
    const usersHandler = Meteor.subscribe('userList', projectId);

    if (projectsHandler.ready() && usersHandler.ready()) {
        const project = Projects.findOne({ _id: projectId });
        const isCurrentUserProjectModerator = isProjectModerator(projectId, Meteor.userId());
        const users = Meteor.users.find({
            _id: {
                $in: project.members,
            },
        }, {
            fields: {
                'profile.name': 1,
                'profile.avatar': 1,
            },
        })
        .map(user => ({
            isModerator: project.moderators.indexOf(user._id) !== -1,
            name: user.profile.name,
            avatar: user.profile.avatar,
            id: user._id,
        }));

        onData(null, {
            users,
            isCurrentUserProjectModerator,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(ProjectMembers),
);
