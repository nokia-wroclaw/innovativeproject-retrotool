import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';
import { FullPageLoader } from '/imports/components/Loaders';

import {
    ActionItems as ActionItemsCollection,
    actions as actionItemsActions,
} from '/imports/api/actionItems';

import { isProjectMember, isProjectModerator } from '/imports/api/projects';
import { Sprints } from '/imports/api/sprints';

import ActionItems from './ActionItemsBoard.jsx';


const toggleActionItem = async (
    actionItemId,
    closeMessage,
    onData,
    sprintId,
    handlers,
    hideButton,
    wrappedData,
) => {
    try {
        await actionItemsActions.toggleActionItemState(actionItemId, closeMessage);
        wrappedData(onData, sprintId, handlers, hideButton);
    } catch (error) {
        wrappedData(onData, sprintId, handlers, hideButton, {
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
    hideButton,
    wrappedData,
) => {
    try {
        await actionItemsActions.createActionItem(sprintId, startDate, endDate, assigneeId, text);
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
            hideButton,
            wrappedData,
            actionItems,
            toggleActionItem,
            addActionItem,
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

const composer = ({ params: { projectId, sprintId }, hideButton }, onData) => {
    const handlers = [
        Meteor.subscribe('actionItems', sprintId),
        Meteor.subscribe('singleSprint', sprintId),
        Meteor.subscribe('singleProject', projectId),
        Meteor.subscribe('projectMembers', projectId),
    ];

    if (handlers.every(handler => handler.ready())) {
        wrappedData(onData, sprintId, handlers, hideButton);
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(ActionItems),
);
