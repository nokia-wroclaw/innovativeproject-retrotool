import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

<<<<<<< HEAD
import isAdmin from '/imports/api/users';
=======
import { FullPageLoader } from '/imports/components/Loaders';

>>>>>>> origin/devel
import { actions as projectActions } from '/imports/api/projects';

import CreateNewProject from './CreateNewProject.jsx';

const composer = (props, onData) => {
    const projectsHandler = Meteor.subscribe('userList');
<<<<<<< HEAD
    const user = Meteor.user();

    if (user && projectsHandler.ready()) {
        const userList = Meteor.users.find({}).fetch();
        onData(null, {
            createNewProject: projectActions.createNewProject,
            goToProject: projectActions.goToProject,
            user,
            isAdmin,
            userList,
=======

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
>>>>>>> origin/devel
        });
    }
};

export default withRouter(
      composeWithTracker(
        composer,
<<<<<<< HEAD
=======
        FullPageLoader,
>>>>>>> origin/devel
    )(CreateNewProject),
);
