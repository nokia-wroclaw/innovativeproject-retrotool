import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    WorkingAgreements as workingAgreementCollection,
    actions as workingAgreementActions,
} from '/imports/api/workingAgreements';

import { isProjectMember, isProjectModerator } from '/imports/api/projects';
import { Sprints } from '/imports/api/sprints';

import WorkingAgreements from './WorkingAgreements.jsx';

const removeWorkingAgreement = (id, sprintId, onData, handlers, wrappedData) => {
    workingAgreementActions.deleteWorkingAgreement(id).then(() => {
        wrappedData(onData, sprintId, handlers, {
            openRemoveSnackbar: true,
        });
    }).catch((error) => {
        wrappedData(onData, sprintId, handlers, {
            errorRemove: error,
        });
    });
};

const addWorkingAgreement = async (sprintId, text, date, onData, handlers, wrappedData) => {
    try {
        await workingAgreementActions.createWorkingAgreement(sprintId, text, date);
        wrappedData(onData, sprintId, handlers, {
            openSnackbar: true,
        });
    } catch (error) {
        wrappedData(onData, sprintId, handlers, {
            errorAdd: error,
        });
    }
};

const closeSnackBar = (sprintId, onData, handlers, wrappedData) => {
    wrappedData(onData, sprintId, handlers, {
        openSnackbar: false,
        openRemoveSnackbar: false,
    });
};

const wrappedData = (onData, sprintId, handlers, data) => {
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
            workingAgreements,
            removeWorkingAgreement,
            addWorkingAgreement,
            closeSnackBar,
            isMember,
            isModerator,
            sprintId,
            isClosed: sprint.closed,
            ...data,
        });
    }
};

const composer = ({ params: { sprintId } }, onData) => {
    const handlers = [
        Meteor.subscribe('WorkingAgreements', sprintId),
        Meteor.subscribe('singleSprint', sprintId),
    ];

    if (handlers.every(handler => handler.ready())) {
        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;
        handlers.push(Meteor.subscribe('singleProject', projectId));

        if (handlers.every(handler => handler.ready())) {
            wrappedData(onData, sprintId, handlers);
        }
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(WorkingAgreements),
);
