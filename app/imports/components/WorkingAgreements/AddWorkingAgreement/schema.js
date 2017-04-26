import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    sprintId: {
        type: String,
    },
    text: {
        type: String,
    },
    date: {
        type: Date,
        defaultValue: new Date(),
    },
});
