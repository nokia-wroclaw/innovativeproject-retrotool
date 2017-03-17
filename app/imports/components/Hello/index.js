import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    actions as projectActions,
} from '/imports/api/projects';

import Hello from './Hello.jsx';

const composer = (props, onData) => {
    onData(null, {
        goToAddProject: projectActions.goToAddProject,
    });
};

export default withRouter(
    composeWithTracker(
        composer,
    )(Hello),
);
