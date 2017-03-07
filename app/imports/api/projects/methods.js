import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { isAdmin } from '/imports/api/users';

import Projects from './Projects.js';
import ProjectSchema, {
    ProjectIdentitySchema,
    AddMembersSchema,
    AddModeratorsSchema,
    UpdateProjectSchema,
    ProjectIdAndUserIdSchema,
} from './schema.js';
import { isProjectModerator } from './helpers.js';

const changeProjectName = (projectId, name) =>
    Projects.update({ _id: projectId }, { $set: { name } });

/**
 * Create new project
 * @param   {String}   name        project display name
 * @param   {Array}    moderators  project moderators (user id), default: project creator
 * @param   {Array}    members     project members (user id), default: project creator
 * @return  {String}               project id
 */
export const createProject = new ValidatedMethod({
    name: 'projects.create',
    validate: ProjectSchema.validator({
        clean: true,
    }),
    run({ name, moderators, members }) {
        if (!isAdmin()) {
            throw new Meteor.Error(
                'projects.create.unauthorized',
                'Only admin can create new project',
            );
        }

        const userId = Meteor.userId();
        if (moderators.length === 0) {
            moderators = [userId];
        }

        if (members.length === 0) {
            members = [userId];
        }

        return Projects.insert({
            name,
            moderators,
            members,
        }, {
            validateContext: ProjectSchema.newContext(),
        });
    },
});

/**
 * Remove project
 * @param   {String}    projectId   project id
 * @return  {Boolean}               true if no error
 */
export const removeProject = new ValidatedMethod({
    name: 'projects.remove',
    validate: ProjectIdentitySchema.validator({ clean: true }),
    run({ projectId }) {
        if (!isAdmin()) {
            throw new Meteor.Error(
                'projects.remove.unauthorized',
                'Only admin can remove project',
            );
        }

        return Projects.remove({ _id: projectId });
    },
});


/**
 * Add member to project
 * @param  {String}    projectId   project id
 * @param  {Array}     members     project members to add
 * @return {Boolean}               true if no error
 */
export const addMembers = new ValidatedMethod({
    name: 'projects.addMembers',
    validate: AddMembersSchema.validator({ clean: true }),
    run({ projectId, members }) {
        const userId = Meteor.userId();
        const project = Projects.findOne({ _id: projectId });
        if (!isAdmin && !isProjectModerator(project, userId)) {
            throw new Meteor.Error(
                'projects.addMembers.unauthorized',
                'No permissions to update!',
            );
        }

        if (!project) {
            throw new Meteor.Error(
                'project-not-found',
                'Project not found!',
            );
        }

        if (members.length === 0) {
            return true;
        }

        return Projects.update({ _id: projectId }, { $addToSet: { members } });
    },
});

/**
 * Remove member from project
 * @param   {String}    projectId projectId
 * @param   {String}    userId user
 * @return  {Boolean}   true if success
 */
export const removeMember = new ValidatedMethod({
    name: 'projects.removeMember',
    validate: ProjectIdAndUserIdSchema.validator({ clean: true }),
    run({ projectId, userId }) {
        const currentUserId = Meteor.userId();
        const project = Projects.findOne({ _id: projectId });
        if (!isAdmin && !isProjectModerator(project, currentUserId)) {
            throw new Meteor.Error(
                'projects.removeMember.unauthorized',
                'No permissions to remove!',
            );
        }

        if (!project) {
            throw new Meteor.Error(
                'project-not-found',
                'Project not found!',
            );
        }

        return Projects.update({ _id: projectId }, { $pull: { userId } });
    },
});

/**
 * Add moderators to project
 * @param  {String}     projectId   project id
 * @param  {Array}      members     project members to add
 * @return {Boolean}                true if no error
*/
export const addModerators = new ValidatedMethod({
    name: 'projects.addModerators',
    validate: AddModeratorsSchema.validator({ clean: true }),
    run({ projectId, moderators }) {
        const userId = Meteor.userId();
        const project = Projects.findOne({ _id: projectId });
        if (!isAdmin && !isProjectModerator(project, userId)) {
            throw new Meteor.Error(
                'projects.addMembers.unauthorized',
                'No permissions to update!',
            );
        }

        if (!project) {
            throw new Meteor.Error(
                'project-not-found',
                'Project not found!',
            );
        }

        return Projects.update({ _id: projectId }, { $addToSet: { moderators } });
    },
});

/**
 * Remove moderator from project
 * @param   {String}    projectId   project id
 * @param   {String}    userId      user
 * @return  {Boolean}               true if success
 */
export const removeModerator = new ValidatedMethod({
    name: 'projects.removeModerator',
    validate: ProjectIdAndUserIdSchema.validator({ clean: true }),
    run({ projectId, userId }) {
        const currentUserId = Meteor.userId();
        const project = Projects.findOne({ _id: projectId });
        if (!isAdmin && !isProjectModerator(project, currentUserId)) {
            throw new Meteor.Error(
                'projects.removeModerator.unauthorized',
                'No permissions to remove!',
            );
        }

        if (!project) {
            throw new Meteor.Error(
                'project-not-found',
                'Project not found!',
            );
        }

        return Projects.update({ _id: projectId }, { $pull: { userId } });
    },
});

/**
 * Update project
 * @param   {String}    id          project id
 * @param   {String}    name        new project name (optional)
 * @param   {Array}     moderators  project moderators to add (user id), default: project creator
 * @param   {Array}     members     project members to add (user id), default: project creator
 */
export const updateProject = new ValidatedMethod({
    name: 'projects.update',
    validate: UpdateProjectSchema.validator({ clean: true }),
    run({ projectId, name, members, moderators }) {
        if (members && members.length !== 0) {
            addMembers.call({ projectId, members, moderators });
        }

        if (moderators && moderators.length !== 0) {
            addModerators.call({ projectId, members, moderators });
        }

        if (name) {
            changeProjectName(projectId, name);
        }
    },
});


// export all methods
export default {
    createProject,
    removeProject,
    addMembers,
    removeMember,
    addModerators,
    removeModerator,
    updateProject,
};
