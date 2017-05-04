import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import {
    isProjectMember,
    isProjectModeratorOrAdmin,
} from '/imports/api/projects';
import {
    isSprintClosed,
    Sprints,
} from '/imports/api/sprints';
import { Posts } from './Posts.js';
import {
    AddPostSchema,
    LikePostSchema,
} from './schema.js';

export const addPost = new ValidatedMethod({
    name: 'posts.add',
    validate: AddPostSchema.validator({
        clean: true,
    }),
    run({ text, showAuthor, sprintId, categoryId }) {
        const authorId = Meteor.userId();
        const sprint = Sprints.findOne(sprintId);

        if (isSprintClosed(sprintId)) {
            throw new Meteor.Error(
                'add-post-sprint-is-closed',
                'Sprint is closed. You can add new posts only in open sprints',
            );
        }

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
        const { sprintId = null } = Posts.findOne(postId);
        const { projectId = null } = Sprints.findOne(sprintId);

        if (isProjectModeratorOrAdmin(projectId, userId)) {
            return Posts.remove({ _id: postId });
        }

        throw new Meteor.Error(
            'posts-only-moderator-can-remove',
            'Only moderator can remove posts',
        );
    },
});

export const likePost = new ValidatedMethod({
    name: 'posts.like',
    validate: LikePostSchema.validator({ clean: true }),
    run({ postId }) {
        const userId = Meteor.userId();
        const { sprintId = null } = Posts.findOne(postId);
        const { projectId = null } = Sprints.findOne(sprintId);
        if (isProjectMember(projectId, userId)) {
            return Posts.update({ _id: postId }, {
                $pull: {
                    dislikes: userId,
                },
                $addToSet: {
                    likes: userId,
                },
            });
        }

        throw new Meteor.Error(
            'posts-only-members-can-like',
            'Only members can like posts',
        );
    },
});

export const dislikePost = new ValidatedMethod({
    name: 'posts.dislike',
    validate: LikePostSchema.validator({ clean: true }),
    run({ postId }) {
        const userId = Meteor.userId();
        const { sprintId = null } = Posts.findOne(postId);
        const { projectId = null } = Sprints.findOne(sprintId);
        if (isProjectMember(projectId, userId)) {
            return Posts.update({ _id: postId }, {
                $pull: {
                    likes: userId,
                },
                $addToSet: {
                    dislikes: userId,
                },
            });
        }

        throw new Meteor.Error(
            'posts-only-members-can-dislike',
            'Only members can dislike posts',
        );
    },
});
