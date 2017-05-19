import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import {
    isProjectModerator,
} from '/imports/api/projects';
import { Sprints } from './Sprints.js';
import {
    AddSprintSchema,
    CloseSprintSchema,
 } from './schema.js';

export const addSprint = new ValidatedMethod({
    name: 'sprints.add',
    validate: AddSprintSchema.validator({ clean: true }),
    run({ name, projectId }) {
        const userId = Meteor.userId();
        const isOpenSprint = Sprints.find({ closed: false }).fetch().length;

        if (isProjectModerator(projectId, userId)) {
            if (!isOpenSprint) {
                return Sprints.insert({ name, projectId });
            }
            throw new Meteor.Error(
                'sprints-only-one-active',
                'There is already open sprint',
            );
        }
        throw new Meteor.Error(
            'sprints-only-moderator-can-add',
            'Only moderator can add new sprint',
        );
    },
});

export const closeOrReopenSprint = new ValidatedMethod({
    name: 'sprints.closeOrReopen',
    validate: CloseSprintSchema.validator({ clean: true }),
    run({ sprintId }) {
        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;
        const userId = Meteor.userId();
        const closed = sprint.closed;
        const isOpenSprint = Sprints.find({ closed: false }).fetch().length;

        if (isProjectModerator(projectId, userId)) {
            if (!closed) {
                return Sprints.update(sprintId, {
                    $set: { closed: true },
                });
            }
            if (closed && !isOpenSprint) {
                return Sprints.update(sprintId, {
                    $set: { closed: false },
                });
            }
            throw new Meteor.Error(
                'sprints-only-one-active',
                'Only one sprint can be open',
            );
        }
        throw new Meteor.Error(
            'sprints-only-moderator-can-close',
            'Only moderator can close sprint',
        );
    },
});
