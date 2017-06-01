import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import { FullPageLoader } from '/imports/components/Loaders';

import {
    WorkingAgreements as workingAgreementCollection,
    actions as workingAgreementActions,
} from '/imports/api/workingAgreements';

import { isProjectMember, isProjectModerator } from '/imports/api/projects';
import { Sprints } from '/imports/api/sprints';

import WorkingAgreements from './WorkingAgreements.jsx';

const removeWorkingAgreement = (
    id,
    sprintId,
    projectId,
    onData,
    handlers,
    hideButton,
    wrappedData,
) => {
    workingAgreementActions.deleteWorkingAgreement(id).then((removeResult) => {
        wrappedData(onData, sprintId, projectId, handlers, hideButton, {
            removeResult: !!removeResult,
        });
    }).catch((error) => {
        wrappedData(onData, sprintId, projectId, handlers, hideButton, {
            errorRemove: error,
        });
    });
};

const addWorkingAgreement = (
    sprintId,
    projectId,
    text,
    date,
    onData,
    handlers,
    hideButton,
    wrappedData,
) => {
    workingAgreementActions.createWorkingAgreement(sprintId, text, date).then((addResult) => {
        wrappedData(onData, sprintId, projectId, handlers, hideButton, {
            addResult: !!addResult,
        });
    }).catch((error) => {
        wrappedData(onData, sprintId, projectId, handlers, hideButton, {
            errorAdd: error,
        });
    });
};

const wrappedData = (onData, sprintId, projectId, handlers, hideButton, data) => {
    if (handlers.every(handler => handler.ready())) {
        const userId = Meteor.userId();
        const sprint = Sprints.findOne(sprintId);
        const isMember = isProjectMember(projectId, userId);
        const isModerator = isProjectModerator(projectId, userId);
        const workingAgreements = workingAgreementCollection.find().fetch();
        const isClosed = sprint ? sprint.closed : true;

        onData(null, {
            onData,
            handlers,
            wrappedData,
            hideButton,
            workingAgreements,
            removeWorkingAgreement,
            addWorkingAgreement,
            isMember,
            isModerator,
            sprintId,
            projectId,
            isClosed,
            ...data,
        });
    }
};

const composer = ({ params: { projectId, sprintId }, hideButton }, onData) => {
    const handlers = [
        Meteor.subscribe('WorkingAgreements', sprintId || projectId, !!sprintId),
        Meteor.subscribe('singleProject', projectId),

    ];

    if (sprintId) {
        handlers.push(Meteor.subscribe('singleSprint', sprintId));
        wrappedData(onData, sprintId, projectId, handlers, hideButton);
    } else {
        wrappedData(onData, '', projectId, handlers, hideButton);
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(WorkingAgreements),
);
