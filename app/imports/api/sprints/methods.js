import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Sprints } from './Sprints.js';
import {
    SprintSchema,
} from './schema.js';

export const addSprint = new ValidatedMethod({
    name: 'sprints.add',
    validate: SprintSchema.validator({ clean: true }),
    run({ name, projectId }) {
        // @todo add check if user is moderator
        return Sprints.insert({ name, projectId });
    },
});
