import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    ActionItems as ActionItemsCollection,
    actions as actionItemsActions,
} from '/imports/api/actionItems';

import { isProjectMember, isProjectModerator } from '/imports/api/projects';
import { Sprints } from '/imports/api/sprints';

import ActionItems from './ActionItems.jsx';


const toggleActionItem = async (
    actionItemId,
    closeMessage,
    onData,
    sprintId,
    handlers,
    wrappedData,
) => {
    try {
        await actionItemsActions.toggleActionItemState(actionItemId, closeMessage);
        wrappedData(onData, sprintId, handlers, {
            openToggleSnackbar: true,
        });
    } catch (error) {
        wrappedData(onData, sprintId, handlers, {
            errorToggle: error,
        });
    }
};

const addActionItem = async (
    sprintId,
    startDate,
    endDate,
    assigneeId,
    text,
    onData,
    handlers,
    wrappedData,
) => {
    try {
        await actionItemsActions.createActionItem(sprintId, startDate, endDate, assigneeId, text);
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
        openToggleSnackbar: false,
    });
};

const wrappedData = (onData, sprintId, handlers, data) => {
    if (handlers.every(handler => handler.ready())) {
        const userId = Meteor.userId();
        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;
        const isMember = isProjectMember(projectId, userId);
        const isModerator = isProjectModerator(projectId, userId);
        const actionItems = ActionItemsCollection.find().fetch();

        actionItems.map((actionItem) => {
            const member = Meteor.users.findOne(actionItem.assigneeId);

            actionItem.assignee = {
                _id: member._id,
                name: member.profile.name,
                avatar: member.profile.avatar,
            };
            return false;
        });

        onData(null, {
            onData,
            handlers,
            wrappedData,
            actionItems,
            toggleActionItem,
            addActionItem,
            closeSnackBar,
            isMember,
            isModerator,
            projectId,
            sprintId,
            isClosed: sprint.closed,
            userId,
            ...data,
        });
    }
};

const composer = ({ params: { sprintId } }, onData) => {
    const handlers = [
        Meteor.subscribe('ActionItems', sprintId),
        Meteor.subscribe('singleSprint', sprintId),
    ];

    if (handlers.every(handler => handler.ready())) {
        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;
        handlers.push(Meteor.subscribe('singleProject', projectId));
        handlers.push(Meteor.subscribe('projectMembers', projectId));

        if (handlers.every(handler => handler.ready())) {
            wrappedData(onData, sprintId, handlers);
        }
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(ActionItems),
);
