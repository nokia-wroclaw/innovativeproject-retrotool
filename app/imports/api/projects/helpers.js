import { isAdmin } from '/imports/api/users';
import { Projects } from './Projects.js';

export const isProjectModerator = (projectId, userId) =>
    !!Projects.findOne({ _id: projectId, moderators: userId });

export const isProjectModeratorOrAdmin = (projectId, userId) =>
    isProjectModerator(projectId, userId) || isAdmin(userId);

export const isProjectMember = (projectId, userId) =>
    !!Projects.findOne({
        _id: projectId,
        $or: [
            { members: userId },
            { moderators: userId },
        ],
    });

export const getProjectName = (projectId) => {
    const project = Projects.findOne(projectId, { fields: { name: 1 } });
    return project ?
        project && project.name
        :
        undefined;
};
