import SimpleSchema from 'simpl-schema';

const SprintSchema = new SimpleSchema({
    name: {
        type: String,
    },
    projectId: {
        type: String,
    },
});

export { SprintSchema };
