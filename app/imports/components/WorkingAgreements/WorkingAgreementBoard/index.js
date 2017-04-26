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
    const workingAgreement = Meteor.subscribe('WorkingAgreementsList', sprintId);

    if (workingAgreement.ready()) {
        const workingAgreements = workingAgreementCollection.find(sprintId).fetch();
            onData(null, {
                createWorkingAgreement: workingAgreementActions.createWorkingAgreement,
                workingAgreements,
            });
        }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(WorkingAgreements),
);



/*
import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    WorkingAgreements as workingAgreementCollection,
    actions as workingAgreementActions,
} from '/imports/api/sprints';

import { Projects, isProjectModerator } from '/imports/api/projects';

import WorkingAgreements from './WorkingAgreements.jsx';


const composer = ({ params: { workingAgreementId } }, onData) => {
    const workingAgreement = Meteor.subscribe('WorkingAgreementsList', workingAgreementId);

    if (workingAgreement.ready()) {

            onData(null, {
                createWorkingAgreement: workingAgreementActions.createWorkingAgreement,
            });
        }

};

export default withRouter(
    composeWithTracker(
        composer,
    )(WorkingAgreements),
);
*/
