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

const composer = ({ params: { projectId, sprintId }, hideButton }, onData) => {
    const handlers = [
        Meteor.subscribe('actionItems', sprintId || projectId, !!sprintId),
        Meteor.subscribe('singleProject', projectId),
        Meteor.subscribe('projectMembers', projectId),
    ];

    if (sprintId) {
        handlers.push(Meteor.subscribe('singleSprint', sprintId));
    }

    if (handlers.every(handler => handler.ready())) {
        const sprint = Sprints.findOne(sprintId);
        const isClosed = sprint ? sprint.closed : true;
        const userId = Meteor.userId();
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
            hideButton,
            actionItems,
            toggleActionItemState: actionItemsActions.toggleActionItemState,
            createActionItem: actionItemsActions.createActionItem,
            isMember,
            isModerator,
            sprintId: sprintId || '',
            isClosed,
            userId,
        });
    }
};

export default withRouter(
    composeWithTracker(
        composer,
        FullPageLoader,
    )(ActionItems),
);
