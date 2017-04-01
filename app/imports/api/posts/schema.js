import SimpleSchema from 'simpl-schema';

export const PostSchema = new SimpleSchema({
    createdAt: {
        type: Date,
        defaultValue: new Date(),
    },
    projectId: {
        type: String,
    },
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
    categoryId: {
        type: String,
    },
});


// method schemas
export const AddPostSchema = new SimpleSchema({
    showAuthor: {
        type: Boolean,
        defaultValue: true,
    },
    text: {
        type: String,
    },
    projectId: {
        type: String,
    },
    categoryId: {
        type: String,
    },
});
