import SimpleSchema from 'simpl-schema';

export const ProjectBaseSchema = new SimpleSchema({
    name: {
        type: String,
    },
});

export const ProjectMembersSchema = new SimpleSchema({
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

export const ProjectModeratorsSchema = new SimpleSchema({
    // array with userIds
    moderators: {
        type: Array,
        defaultValue: [],
        optional: true,
    },
    'moderators.$': {
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
ProjectSchema.extend(ProjectMembersSchema);
ProjectSchema.extend(ProjectModeratorsSchema);
ProjectSchema.extend(ProjectSprintsSchema);

// Methods schemas


export const ProjectIdentitySchema = new SimpleSchema({
    projectId: {
        type: String,
    },
});

export const AddMembersSchema = new SimpleSchema({});
AddMembersSchema.extend(ProjectIdentitySchema);
AddMembersSchema.extend(ProjectMembersSchema);

export const AddModeratorsSchema = new SimpleSchema({});
AddModeratorsSchema.extend(ProjectIdentitySchema);
AddModeratorsSchema.extend(ProjectModeratorsSchema);

export const UpdateProjectSchema = new SimpleSchema({});
UpdateProjectSchema.extend(ProjectIdentitySchema);
UpdateProjectSchema.extend(ProjectMembersSchema);
UpdateProjectSchema.extend(ProjectModeratorsSchema);

export const ProjectIdAndUserIdSchema = new SimpleSchema({
    projectId: {
        type: String,
    },
    userId: {
        type: String,
    },
});

export { ProjectSchema };
