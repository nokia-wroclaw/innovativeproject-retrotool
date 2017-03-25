import SimpleSchema from 'simpl-schema';

export const PostSchema = new SimpleSchema({
    authorId: {
        type: String,
    },
    showAuthor: {
        type: Boolean,
        defaultValue: true,
    },
    text: {
        type: String,
    },
});

