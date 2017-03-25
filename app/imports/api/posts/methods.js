import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import { Posts } from './Posts.js';
import {
    AddPostSchema,
} from './schema.js';

export const addPost = new ValidatedMethod({
    name: 'posts.add',
    validate: AddPostSchema.validator({
        clean: true,
    }),
    run({ text, showAuthor }) {
        // @TODO: projectId
        const authorId = Meteor.userId();
        return Posts.insert({
            text,
            showAuthor,
            authorId,
        });
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
        // @TODO check if is admin or moderator
        return Posts.remove({ _id: postId });
    },
});
