import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import {
    isProjectMember,
    isProjectModerator,
} from '/imports/api/projects';
import { Sprints } from '/imports/api/sprints';
import { isAdmin } from '/imports/api/users';
import { Posts } from './Posts.js';
import {
    AddPostSchema,
} from './schema.js';

export const addPost = new ValidatedMethod({
    name: 'posts.add',
    validate: AddPostSchema.validator({
        clean: true,
    }),
    run({ text, showAuthor, sprintId, categoryId }) {
        const authorId = Meteor.userId();
        const sprint = Sprints.findOne(sprintId);

        const { projectId = null } = sprint;

        if (isProjectMember(projectId, authorId)) {
            return Posts.insert({
                sprintId,
                text,
                showAuthor,
                authorId,
                categoryId,
            });
        }

        throw new Meteor.Error(
            'posts-only-members-can-add',
            'Only members can add new posts',
        );
    },
});

export const removePost = new ValidatedMethod({
    name: 'posts.remove',
    validate: new SimpleSchema({
        postId: {
            type: String,
        },
    }).validator({ clean: true }),
    run({ postId }) {
        const userId = Meteor.userId();
        const post = Posts.findOne(postId);
        const { projectId = null } = post;

        if (isProjectModerator(projectId, userId) || isAdmin()) {
            return Posts.remove({ _id: postId });
        }

        throw new Meteor.Error(
            'posts-only-moderator-can-remove',
            'Only moderator can remove posts',
        );
    },
});
