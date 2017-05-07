import SimpleSchema from 'simpl-schema';

const SprintSchema = new SimpleSchema({
    name: {
        type: String,
    },
    projectId: {
        type: String,
    },
    closed: {
        type: Boolean,
        defaultValue: false,
    },
    createdAt: {
        type: Date,
        defaultValue: new Date(),
    },
});

// Methods schema

export const CloseSprintSchema = new SimpleSchema({
    sprintId: {
        type: String,
    },
});

export const AddSprintSchema = new SimpleSchema({
    name: {
        type: String,
    },
    projectId: {
        type: String,
    },
});

export { SprintSchema };
