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


const toggleActionItem = (
    actionItemId,
    closeMessage,
    onData,
    sprintId,
    projectId,
    handlers,
    hideButton,
    wrappedData,
) => {
    actionItemsActions.toggleActionItemState(
        actionItemId,
        closeMessage,
    ).then((toggleResult) => {
        wrappedData(onData, sprintId, projectId, handlers, hideButton, {
            toggleResult: !!toggleResult,
        });
    }).catch((error) => {
        wrappedData(onData, sprintId, projectId, handlers, hideButton, {
            errorToggle: error,
        });
    });
};

const addActionItem = (
    sprintId,
    projectId,
    startDate,
    endDate,
    assigneeId,
    text,
    onData,
    handlers,
    hideButton,
    wrappedData,
) => {
    actionItemsActions.createActionItem(
        sprintId,
        startDate,
        endDate,
        assigneeId,
        text,
    ).then((addResult) => {
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

        const isClosed = sprint ? sprint.closed : true;

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
            sprintId,
            projectId,
            isClosed,
            userId,
            ...data,
        });
    }
};

const composer = ({ params: { projectId, sprintId }, hideButton }, onData) => {
    const handlers = [
        Meteor.subscribe('actionItems', sprintId || projectId, !!sprintId),
        Meteor.subscribe('singleProject', projectId),
        Meteor.subscribe('projectMembers', projectId),
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
    )(ActionItems),
);
