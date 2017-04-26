import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    text: {
        type: String,
    },
    date: {
        type: Date,
        defaultValue: new Date(),
    },
});
