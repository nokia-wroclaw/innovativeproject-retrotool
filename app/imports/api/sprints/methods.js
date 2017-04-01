import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import {
    Projects,
    isProjectModerator,
} from '/imports/api/projects';

import { Sprints } from './Sprints.js';
import {
    SprintSchema,
} from './schema.js';

export const addSprint = new ValidatedMethod({
    name: 'sprints.add',
    validate: SprintSchema.validator({ clean: true }),
    run({ name, projectId }) {
        const userId = Meteor.userId();
        const project = Projects.findOne(projectId);


        if (isProjectModerator(project, userId)) {
            return Sprints.insert({ name, projectId });
        }

        throw new Meteor.Error(
            'sprints-only-moderator-can-add',
            'Only moderator can add new sprint',
        );
    },
});
