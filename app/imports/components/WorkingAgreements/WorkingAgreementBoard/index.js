import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    WorkingAgreements as workingAgreementCollection,
    actions as workingAgreementActions,
} from '/imports/api/workingAgreements';

import { Projects, isProjectModerator } from '/imports/api/projects';

import WorkingAgreements from './WorkingAgreements.jsx';


const composer = ({ params: { sprintId } }, onData) => {
    const workingAgreement = Meteor.subscribe('WorkingAgreements', sprintId);

    if (workingAgreement.ready()) {
        const workingAgreements = workingAgreementCollection.find().fetch();

        onData(null, {
            createWorkingAgreement: workingAgreementActions.createWorkingAgreement,
            deleteWorkingAgreement: workingAgreementActions.deleteWorkingAgreement,
            workingAgreements,
            sprintId,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(WorkingAgreements),
);
