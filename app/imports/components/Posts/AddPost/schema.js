import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    text: {
        type: String,
    },
    categoryId: {
        type: String,
    },
    showAuthor: {
        type: Boolean,
        defaultValue: true,
    },
});
