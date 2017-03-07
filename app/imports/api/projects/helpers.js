export const isProjectModerator = (project, userId) =>
    project && project.moderators && project.moderators.indexOf(userId) !== -1;

export default {
    isProjectModerator,
};
