<<<<<<< HEAD
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

=======
import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { FullPageLoader } from '/imports/components/Loaders';

>>>>>>> origin/devel
import { actions as sprintActions } from '/imports/api/sprints';
import { actions as projectActions } from '/imports/api/projects';

import AddSprint from './AddSprint.jsx';

const composer = ({ params: { projectId } }, onData) => {
<<<<<<< HEAD
    onData(null, {
        projectId,
        addNewSprint: sprintActions.addNewSprint,
        goToProject: projectActions.goToProject,
    });
=======
    const projectHandler = Meteor.subscribe('singleProject', projectId);

    if (projectHandler.ready()) {
        onData(null, {
            projectId,
            addNewSprint: sprintActions.addNewSprint,
            goToProject: projectActions.goToProject,
        });
    }
>>>>>>> origin/devel
};

export default withRouter(
      composeWithTracker(
        composer,
<<<<<<< HEAD
=======
        FullPageLoader,
>>>>>>> origin/devel
    )(AddSprint),
);
