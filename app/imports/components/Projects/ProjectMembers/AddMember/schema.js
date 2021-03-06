import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    members: {
        type: Array,
        defaultValue: [],
    },
    'members.$': {
        type: String,
    },
    moderators: {
        type: Array,
        defaultValue: [],
    },
    'moderators.$': {
        type: String,
    },
});
