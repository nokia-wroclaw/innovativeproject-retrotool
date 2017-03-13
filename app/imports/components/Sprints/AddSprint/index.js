import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import { actions } from '/imports/api/sprints';
import AddSprint from './AddSprint.jsx';

const { addNewSprint } = actions;

const composer = ({ params: { projectId } }, onData) => {
    onData(null, {
        projectId,
        addNewSprint,
    });
};

export default withRouter(
      composeWithTracker(
        composer,
    )(AddSprint),
);
