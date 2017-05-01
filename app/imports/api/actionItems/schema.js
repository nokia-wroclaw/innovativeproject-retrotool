import SimpleSchema from 'simpl-schema';

const ActionItemsSchema = new SimpleSchema({
    sprintId: {
        type: String,
    },
    startDate: {
        type: Date,
        defaultValue: new Date(),
    },
    endDate: {
        type: Date,
        defaultValue: new Date(),
    },
    assigneeId: {
        type: String,
    },
    text: {
        type: String,
    },
    open: {
        type: Boolean,
        defaultValue: true,
    },
});

const closeOrReopenActionItemsSchema = new SimpleSchema({
    open: {
        type: Boolean,
    },
    closeMessage: {
        type: String,
    },
});

export { ActionItemsSchema, closeOrReopenActionItemsSchema };
