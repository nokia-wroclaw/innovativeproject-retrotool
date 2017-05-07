import SimpleSchema from 'simpl-schema';

export const CommentSchema = new SimpleSchema({
    createdAt: {
        type: Date,
        defaultValue: new Date(),
    },
    postId: {
        type: String,
    },
    authorId: {
        type: String,
    },
    showAuthor: {
        type: Boolean,
        defaultValue: false,
    },
    text: {
        type: String,
    },
});

export const AddCommentSchema = CommentSchema.pick('showAuthor', 'text', 'postId');

export default CommentSchema;
