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
});

// Methods schema


export const SprintsIdentitySchema = new SimpleSchema({
    sprintId: {
        type: String,
    },
});

export const AddSprintSchema = new SimpleSchema({});
AddSprintSchema.extend(SprintsIdentitySchema);
AddSprintSchema.extend(SprintSchema);

export const CloseSprintSchema = new SimpleSchema({
    project: {
        type: String,
    },
});

export { SprintSchema };
