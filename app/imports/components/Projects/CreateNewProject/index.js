import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { actions as projectActions } from '/imports/api/projects';

import CreateNewProject from './CreateNewProject.jsx';

const composer = (props, onData) => {
    const projectsHandler = Meteor.subscribe('userList');

    if (projectsHandler.ready()) {
        const userList = Meteor.users.find({}).fetch();

        const newUserList = userList.map(thisUser => ({
            _id: thisUser._id,
            username: thisUser.profile.name,
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
    )(CreateNewProject),
);
