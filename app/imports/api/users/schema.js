import SimpleSchema from 'simpl-schema';

export const setAdminSchema = new SimpleSchema({
    userId: {
        type: String,
    },
});

export const removeAdminSchema = new SimpleSchema({
    userId: {
        type: String,
    },
});
