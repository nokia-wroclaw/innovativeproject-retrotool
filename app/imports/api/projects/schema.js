import SimpleSchema from 'simpl-schema';

export const ProjectBaseSchema = new SimpleSchema({
    name: {
        type: String,
    },
    // array with userIds
    moderators: {
        type: Array,
        defaultValue: [],
        optional: true,
    },
    'moderators.$': {
        type: String,
    },
    // array with userIds
    members: {
        type: Array,
        defaultValue: [],
        optional: true,
    },
    'members.$': {
        type: String,
    },
});

export const ProjectSprintsSchema = new SimpleSchema({
    // array with sprintIds
    sprints: {
        type: Array,
        defaultValue: [],
        optional: true,
    },
    'sprints.$': {
        type: String,
    },
});

const ProjectSchema = new SimpleSchema({});
ProjectSchema.extend(ProjectBaseSchema);
ProjectSchema.extend(ProjectSprintsSchema);

export default ProjectSchema;
