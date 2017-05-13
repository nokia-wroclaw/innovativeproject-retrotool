import SimpleSchema from 'simpl-schema';

const ActionItemsSchema = new SimpleSchema({
    projectId: {
        type: String,
    },
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
        custom() {
            if (this.value < this.field('startDate').value) {
                return 'Start date is older than end date';
            }
            return false;
        },
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
    closeMessage: {
        type: String,
        defaultValue: '',
        optional: true,
    },
});

const AddActionItemsSchema = ActionItemsSchema.pick(
    'sprintId',
    'startDate',
    'endDate',
    'assigneeId',
    'text',
);

const CloseOrReopenActionItemsSchema = new SimpleSchema({
    actionItemId: {
        type: String,
    },
    closeMessage: {
        type: String,
        optional: true,
    },
});

export {
    ActionItemsSchema,
    AddActionItemsSchema,
    CloseOrReopenActionItemsSchema,
};
