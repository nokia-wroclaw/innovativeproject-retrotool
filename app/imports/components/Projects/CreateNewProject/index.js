import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import isAdmin from '/imports/api/users';
import { actions as projectActions } from '/imports/api/projects';

import CreateNewProject from './CreateNewProject.jsx';

const composer = (props, onData) => {
    const projectsHandler = Meteor.subscribe('userList');
    const user = Meteor.user();

    if (user && projectsHandler.ready()) {
        const userList = Meteor.users.find({}).fetch();
        onData(null, {
            createNewProject: projectActions.createNewProject,
            goToProject: projectActions.goToProject,
            user,
            isAdmin,
            userList,
        });
    }
};

export default withRouter(
      composeWithTracker(
        composer,
    )(CreateNewProject),
);
