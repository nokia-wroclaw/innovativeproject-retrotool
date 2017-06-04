import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    moderators: {
        type: Array,
        defaultValue: '',
    },
    'moderators.$': {
        type: String,
    },
});
