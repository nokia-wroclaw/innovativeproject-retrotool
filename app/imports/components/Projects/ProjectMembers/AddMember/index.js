import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import { FullPageLoader } from '/imports/components/Loaders';
import {
    Projects,
    actions,
} from '/imports/api/projects';
import AddMember from './AddMember.jsx';

const {
    addMembers,
} = actions;

const composer = ({ projectId, onClose, ...props }, onData) => {
    const projectsHandler = Meteor.subscribe('singleProject', projectId);
    const usersHandler = Meteor.subscribe('userList', projectId, true);

    if (projectsHandler.ready() && usersHandler.ready()) {
        const project = Projects.findOne({ _id: projectId });
        const users = Meteor.users.find({
            _id: {
                $nin: project.members,
            },
        }, {
            fields: {
                'profile.name': 1,
                'profile.avatar': 1,
            },
        })
        .map(user => ({
            label: user.profile.name,
            avatar: user.profile.avatar,
            value: user._id,
        }));

        onData(null, {
            projectId,
            users,
            addMembers,
            onClose,
            ...props,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(AddMember),
);
