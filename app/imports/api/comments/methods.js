import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { AddCommentSchema } from './schema.js';
import { Comments } from './Comments.js';

export const addComment = new ValidatedMethod({
    name: 'comments.add',
    validate: AddCommentSchema.validator({ clean: true }),
    run({ postId, showAuthor, text }) {
        // @TODO add check user
        const authorId = Meteor.userId();

        return Comments.insert({
            text,
            showAuthor,
            authorId,
            postId,
        });
    },
});
