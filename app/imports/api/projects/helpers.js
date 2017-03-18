/**
 * Check if user is project moderator
 * @param  {Object} project project doc, must include `moderators` field
 * @param  {String} userId  userId to check
 * @return {Boolean}        true if user is project moderator
 */
export const isProjectModerator = (project, userId) =>
    project && project.moderators && project.moderators.indexOf(userId) !== -1;
