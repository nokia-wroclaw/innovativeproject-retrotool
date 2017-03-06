import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import Projects from './Projects.js';
import { ProjectBaseSchema } from './schema.js';

export const createProject = new ValidatedMethod({
    name: 'projects.create',
    validate: ProjectBaseSchema.validator({
        clean: true,
    }),
    run({ name, moderators, members }) {
        const user = Meteor.user();
        if (!user || !user.isAdmin) {
            throw new Meteor.Error(
                'projects.create.unauthorized',
                'Only admin can create new project',
            );
        }

        if (moderators.length === 0) {
            moderators = [user._id];
        }

        if (members.length === 0) {
            members = [user._id];
        }

        return Projects.insert({
            name,
            moderators,
            members,
        }, {
            validateContext: ProjectBaseSchema.newContext(),
        });
    },
});

// export all methods
export default {
    createProject,
};
