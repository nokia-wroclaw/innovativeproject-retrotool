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

export const setNameSchema = new SimpleSchema({
    name: {
        type: String,
        min: 3,
        max: 50,
    },
});

export const setAwatarSchema = new SimpleSchema({
    service: {
        type: String,
    },
});
