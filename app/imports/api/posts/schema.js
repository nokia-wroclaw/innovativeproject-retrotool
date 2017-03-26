import SimpleSchema from 'simpl-schema';

export const PostSchema = new SimpleSchema({
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
    // @TODO add category
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
});
