import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const PostSchema = new SimpleSchema({
    createdAt: {
        type: Date,
        defaultValue: new Date(moment.now()),
    },
    sprintId: {
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
    likes: {
        type: Array,
        defaultValue: [],
    },
    'likes.$': {
        type: String,
    },
    dislikes: {
        type: Array,
        defaultValue: [],
    },
    'dislikes.$': {
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
    sprintId: {
        type: String,
    },
    categoryId: {
        type: String,
    },
});

export const LikePostSchema = new SimpleSchema({
    postId: {
        type: String,
    },
});
