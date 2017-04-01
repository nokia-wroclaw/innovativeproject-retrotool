import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import {
    Projects,
    isProjectMember,
    isProjectModerator,
} from '/imports/api/projects';

import { Posts } from './Posts.js';
import {
    AddPostSchema,
} from './schema.js';

export const addPost = new ValidatedMethod({
    name: 'posts.add',
    validate: AddPostSchema.validator({
        clean: true,
    }),
    run({ text, showAuthor, projectId, categoryId }) {
        const authorId = Meteor.userId();
        const project = Projects.findOne(projectId);

        if (isProjectMember(project, authorId)) {
            return Posts.insert({
                projectId,
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
        const { projectId } = post;
        const project = Projects.findOne(projectId);

        if (isProjectModerator(project, userId)) {
            return Posts.remove({ _id: postId });
        }

        throw new Meteor.Error(
            'posts-only-moderator-can-remove',
            'Only moderator can remove posts',
        );
    },
});
