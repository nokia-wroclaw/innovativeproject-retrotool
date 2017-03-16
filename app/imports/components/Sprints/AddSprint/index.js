import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { actions as sprintActions } from '/imports/api/sprints';
import { actions as projectActions } from '/imports/api/projects';

import AddSprint from './AddSprint.jsx';

const composer = ({ params: { projectId } }, onData) => {
    onData(null, {
        projectId,
        addNewSprint: sprintActions.addNewSprint,
        goToProject: projectActions.goToProject,
    });
};

export default withRouter(
      composeWithTracker(
        composer,
    )(AddSprint),
);
