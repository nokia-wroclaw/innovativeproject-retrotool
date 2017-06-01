import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { isProjectMember, isProjectModerator } from '/imports/api/projects';
import { getProjectIdByPostId } from '/imports/api/posts';
import { AddCommentSchema } from './schema.js';
import { Comments } from './Comments.js';

export const addComment = new ValidatedMethod({
    name: 'comments.add',
    validate: AddCommentSchema.validator({ clean: true }),
    run({ postId, showAuthor, text }) {
        const authorId = Meteor.userId();
        const projectId = getProjectIdByPostId(postId);

        if (isProjectMember(projectId, authorId)) {
            return Comments.insert({
                text,
                createdAt: new Date(),
                showAuthor,
                authorId,
                postId,
            });
        }
        throw new Meteor.Error(
            'comments-only-project-members-can-add-comments',
            'Only project members can add comments',
        );
    },
});

export const removeComment = new ValidatedMethod({
    name: 'comments.remove',
    validate: new SimpleSchema({ id: String }).validator({ clean: true }),
    run({ id }) {
        const userId = Meteor.userId();
        const comment = Comments.findOne(id) || {};
        const projectId = getProjectIdByPostId(comment.postId);

        if (isProjectModerator(projectId, userId)) {
            return Comments.remove(id);
        }

        throw new Meteor.Error(
            'comments-only-project-members-can-add-comments',
            'Only project members can add comments',
        );
    },
});
