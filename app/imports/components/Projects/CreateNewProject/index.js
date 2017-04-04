import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { FullPageLoader } from '/imports/components/Loaders';

import { actions as projectActions } from '/imports/api/projects';

import CreateNewProject from './CreateNewProject.jsx';

const composer = (props, onData) => {
    const projectsHandler = Meteor.subscribe('userList');

    if (projectsHandler.ready()) {
        const newUserList = Meteor.users.find({})
            .map(user => ({
                _id: user._id,
                username: user.profile.name,
            }));

        onData(null, {
            createNewProject: projectActions.createNewProject,
            goToProject: projectActions.goToProject,
            newUserList,
        });
    }
};

export default withRouter(
      composeWithTracker(
        composer,
        FullPageLoader,
    )(CreateNewProject),
);
