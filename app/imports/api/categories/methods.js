import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { isAdmin } from '/imports/api/users';
import { isProjectModerator } from '/imports/api/projects';
import { Categories } from './Categories.js';
import {
    AddCategorySchema,
    RemoveCategorySchema,
} from './schema.js';

export const addCategory = new ValidatedMethod({
    name: 'categories.add',
    validate: AddCategorySchema.validator({ clean: true }),
    run({ name, projectId }) {
        const userId = Meteor.userId();
        const canAdd = isProjectModerator(projectId, userId) || isAdmin();

        if (!canAdd) {
            throw new Meteor.Error(
                'no-permission-to-add-category',
                'You are not permitted to add category',
            );
        }

        return Categories.insert({
            name,
            projectId,
        });
    },
});

export const removeCategory = new ValidatedMethod({
    name: 'categories.remove',
    validate: RemoveCategorySchema.validator({ clean: true }),
    run({ id }) {
        const { projectId } = Categories.findOne(id) || {};
        const userId = Meteor.userId();
        const canRemove = isProjectModerator(projectId, userId) || isAdmin();

        if (!canRemove) {
            throw new Meteor.Error(
                'no-permission-to-remove-category',
                'You are not permitted to remove category',
            );
        }

        return Categories.remove(id);
    },
});
