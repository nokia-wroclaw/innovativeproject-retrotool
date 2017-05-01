import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { isProjectMember, isProjectModerator } from '/imports/api/projects';
import { Sprints } from '/imports/api/sprints';
import { ActionItems } from './ActionItems.js';
import {
    ActionItemsSchema,
    closeOrReopenActionItemsSchema,
} from './schema.js';

export const addActionItem = new ValidatedMethod({
    name: 'actionItem.add',
    validate: ActionItemsSchema.validator({ clean: true }),
    run({ sprintId, startDate, endDate, assigneeId, text }) {
        const userId = Meteor.userId();
        const sprint = Sprints.findOne(sprintId);

        if (sprint.closed === true) {
            throw new Meteor.Error(
                'action-items-only-open-sprint-add',
                'You can add new action item only in open sprints',
            );
        }

        const projectId = sprint.projectId;

        if (isProjectMember(projectId, userId)) {
            const open = true;
            return ActionItems.insert({ sprintId, startDate, endDate, assigneeId, text, open });
        }
        throw new Meteor.Error(
            'action-items-only-members-can-add',
            'Only member can add new action item',
        );
    },
});

export const closeOrReopenActionItem = new ValidatedMethod({
    name: 'actionItem.closeOrReopen',
    validate: closeOrReopenActionItemsSchema.validator({ clean: true }),
    run({ actionItemId, closeMessage }) {
        const userId = Meteor.userId();

        const actionItem = ActionItems.findOne(actionItemId);
        const sprintId = actionItem.sprintId;
        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;
        const open = actionItem.open;

        if (isProjectModerator(projectId, userId)) {
            return ActionItems.update(actionItemId, {
                $set: { open: !open,
                    closeMessage,
                },
            });
        }
        throw new Meteor.Error(
            'action-items-only-moderator-can-change',
            'Only moderator can close or reopen action items',
        );
    },
});
