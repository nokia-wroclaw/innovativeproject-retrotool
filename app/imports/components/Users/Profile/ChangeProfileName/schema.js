import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    text: {
        type: String,
        min: 3,
        max: 25,
    },
});
