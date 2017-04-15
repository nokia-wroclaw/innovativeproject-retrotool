import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { isProjectMember } from '/imports/api/projects';
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
