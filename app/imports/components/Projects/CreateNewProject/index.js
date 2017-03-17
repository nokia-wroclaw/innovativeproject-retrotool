import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import isAdmin from '/imports/api/users';
import { actions as projectActions } from '/imports/api/projects';

import CreateNewProject from './CreateNewProject.jsx';

const composer = (props, onData) => {
    const user = Meteor.user();
    //  todo admin validation
    if (user) {
        onData(null, {
            createNewProject: projectActions.createNewProject,
            goToProject: projectActions.goToProject,
            user,
            isAdmin,
        });
    }
};

export default withRouter(
      composeWithTracker(
        composer,
    )(CreateNewProject),
);
