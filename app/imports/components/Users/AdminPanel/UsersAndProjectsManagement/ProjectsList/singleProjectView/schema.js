import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    moderators: {
        type: Array,
        defaultValue: 'mikze',
    },
    'moderators.$': {
        type: String,
    },
});
