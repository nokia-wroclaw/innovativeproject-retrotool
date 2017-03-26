import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import isAdmin from '/imports/api/users';
import { actions as projectActions } from '/imports/api/projects';

import CreateNewProject from './CreateNewProject.jsx';

const composer = (props, onData) => {
    const projectsHandler = Meteor.subscribe('userList');
    const user = Meteor.user();

    if (user && projectsHandler.ready()) {
        const userList = Meteor.users.find({}).fetch();

        const newUserList = [];

        for (i=0; i < userList.length; i++) {
            newUserList.push({
                _id: userList[i]._id,
                username: userList[i].profile.name,
            });
        }

        onData(null, {
            createNewProject: projectActions.createNewProject,
            goToProject: projectActions.goToProject,
            user,
            isAdmin,
            newUserList,
        });
    }
};

export default withRouter(
      composeWithTracker(
        composer,
    )(CreateNewProject),
);
