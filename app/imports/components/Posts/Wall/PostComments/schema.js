import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    text: String,
    showAuthor: {
        type: Boolean,
        defaultValue: true,
    },
});
