import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import { actions as projectActions } from '/imports/api/projects';

import CreateNewProject from './CreateNewProject.jsx';

const composer = (props, onData) => {
    onData(null, {
        createNewProject: projectActions.createNewProject,
        goToProject: projectActions.goToProject,
    });
};

export default withRouter(
      composeWithTracker(
        composer,
    )(CreateNewProject),
);
