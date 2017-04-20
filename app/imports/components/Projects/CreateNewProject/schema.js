import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    name: {
        type: String,
        min: 3,
    },
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
