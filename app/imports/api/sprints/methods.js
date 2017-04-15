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
        if (isProjectModerator(projectId, userId)) {
            return Sprints.insert({ name, projectId });
        }
        throw new Meteor.Error(
            'sprints-only-moderator-can-add',
            'Only moderator can add new sprint',
        );
    },
});

export const closeSprint = new ValidatedMethod({
    name: 'sprints.close',
    validate: CloseSprintSchema.validator({ clean: true }),
    run({ sprintId }) {
        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;
        const userId = Meteor.userId();

        if (isProjectModerator(projectId, userId)) {
            return Sprints.update(sprintId, {
                $set: { closed: true },
            });
        }
        throw new Meteor.Error(
            'sprints-only-moderator-can-close',
            'Only moderator can close sprint',
        );
    },
});
