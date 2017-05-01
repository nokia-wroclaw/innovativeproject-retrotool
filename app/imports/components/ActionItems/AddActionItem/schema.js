import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    startDate: {
        type: Date(),
    },
    endDate: {
        type: Date,
        defaultValue: new Date(),
    },
    assignee: {
        type: String,
    },
    text: {
        type: String,
        min: 3,
        max: 250,
    },
});
