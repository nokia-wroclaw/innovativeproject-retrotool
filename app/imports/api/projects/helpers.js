import { Projects } from './Projects.js';

export const isProjectModerator = (projectId, userId) => {
    const project = Projects.findOne(projectId);
    return project && project.moderators && project.moderators.indexOf(userId) !== -1;
};

export const isProjectMember = (projectId, userId) => {
    const project = Projects.findOne(projectId);
    return (
        (project && project.members && project.members.indexOf(userId) !== -1) ||
        isProjectModerator(projectId, userId)
    );
};

export const getProjectName = (projectId) => {
    const project = Projects.findOne(projectId);
    return project ?
        project && project.name
        :
        undefined;
};
