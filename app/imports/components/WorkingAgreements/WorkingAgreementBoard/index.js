import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    WorkingAgreements as workingAgreementCollection,
    actions as workingAgreementActions,
} from '/imports/api/workingAgreements';

import { isProjectMember } from '/imports/api/projects';
import { Sprints } from '/imports/api/sprints';

import WorkingAgreements from './WorkingAgreements.jsx';


const composer = ({ params: { sprintId } }, onData) => {
    const workingAgreement = Meteor.subscribe('WorkingAgreements', sprintId);
    const sprintHandler = Meteor.subscribe('singleSprint', sprintId);


    if (workingAgreement.ready() && sprintHandler.ready()) {
        const workingAgreements = workingAgreementCollection.find().fetch();
        const userId = Meteor.userId();

        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;
        const projectsHandler = Meteor.subscribe('singleProject', projectId);

        if (projectsHandler.ready()) {
            const isMember = isProjectMember(projectId, userId);

            onData(null, {
                createWorkingAgreement: workingAgreementActions.createWorkingAgreement,
                deleteWorkingAgreement: workingAgreementActions.deleteWorkingAgreement,
                workingAgreements,
                sprintId,
                isMember,
            });
        }
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(WorkingAgreements),
);
