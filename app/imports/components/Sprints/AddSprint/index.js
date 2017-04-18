import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import { FullPageLoader } from '/imports/components/Loaders';
import { actions as sprintActions } from '/imports/api/sprints';

import AddSprint from './AddSprint.jsx';

const composer = ({ params: { projectId } }, onData) => {
    const projectHandler = Meteor.subscribe('singleProject', projectId);

    const onSubmit = async (doc) => {
        try {
            const sprintId = await sprintActions.addNewSprint(doc.name, projectId);
            sprintActions.goToSprint(projectId, sprintId);
        } catch (error) {
            onData(null, {
                onSubmit,
                error,
            });
        }
    };

    if (projectHandler.ready()) {
        onData(null, {
            onSubmit,
        });
    }
};

export default withRouter(
      composeWithTracker(
        composer,
        FullPageLoader,
    )(AddSprint),
);
