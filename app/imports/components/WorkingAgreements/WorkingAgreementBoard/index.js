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

const removeWorkingAgreement = (id, sprintId, onData, handlers, hideButton, wrappedData) => {
    workingAgreementActions.deleteWorkingAgreement(id).then(() => {
        wrappedData(onData, sprintId, handlers, hideButton);
    }).catch((error) => {
        wrappedData(onData, sprintId, handlers, hideButton, {
            errorRemove: error,
        });
    });
};

const addWorkingAgreement = async (
    sprintId,
    text,
    date,
    onData,
    handlers,
    hideButton,
    wrappedData,
) => {
    try {
        await workingAgreementActions.createWorkingAgreement(sprintId, text, date);
        wrappedData(onData, sprintId, handlers, hideButton);
    } catch (error) {
        wrappedData(onData, sprintId, handlers, hideButton, {
            errorAdd: error,
        });
    }
};

const wrappedData = (onData, sprintId, handlers, hideButton, data) => {
    if (handlers.every(handler => handler.ready())) {
        const userId = Meteor.userId();
        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;
        const isMember = isProjectMember(projectId, userId);
        const isModerator = isProjectModerator(projectId, userId);
        const workingAgreements = workingAgreementCollection.find().fetch();

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
            isClosed: sprint.closed,
            ...data,
        });
    }
};

const composer = ({ params: { projectId, sprintId }, hideButton }, onData) => {
    const handlers = [
        Meteor.subscribe('WorkingAgreements', sprintId || projectId, !!sprintId),
        Meteor.subscribe('singleSprint', sprintId),
    ];

    if (handlers.every(handler => handler.ready())) {
        handlers.push(Meteor.subscribe('singleProject', projectId));

        if (handlers.every(handler => handler.ready())) {
            wrappedData(onData, sprintId, handlers, hideButton);
        }
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(WorkingAgreements),
);
