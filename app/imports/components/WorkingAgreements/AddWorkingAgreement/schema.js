import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    text: {
        type: String,
        min: 3,
        max: 250,
    },
    date: {
        type: Date,
        defaultValue: new Date(),
    },
});
