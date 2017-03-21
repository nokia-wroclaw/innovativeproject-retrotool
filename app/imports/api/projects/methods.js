import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import _ from 'lodash';

import { isAdmin } from '/imports/api/users';

import { Projects } from './Projects.js';
import {
    ProjectSchema,
    ProjectIdentitySchema,
    AddMembersSchema,
    AddModeratorsSchema,
    UpdateProjectSchema,
    ProjectIdAndUserIdSchema,
} from './schema.js';
import { isProjectModerator } from './helpers.js';

const throwErrorIfProjectDoesNotExist = (project) => {
    if (!project) {
        throw new Meteor.Error(
            'project-not-found',
            'Project not found!',
        );
    }
};

const throwErrorIfNotAdmin = () => {
    if (!isAdmin()) {
        throw new Meteor.Error(
            'projects.unauthorized.only-admin',
            'Only admin is authorized to do it',
        );
    }
};

const throwErrorIfNotProjectModeratorOrAdmin = (project, userId) => {
    if (!isAdmin && !isProjectModerator(project, userId)) {
        throw new Meteor.Error(
            'projects.unauthorized.only-moderator-or-admin',
            'No permissions to update!',
        );
    }
};

const changeProjectName = (projectId, name) => {
    throwErrorIfNotAdmin();
    return Projects.update({ _id: projectId }, { $set: { name } });
};

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
        //  throwErrorIfNotAdmin();

        const currentUserId = Meteor.userId();
        if (moderators.length === 0) {
            moderators = [currentUserId];
        }

        members = _.union(members, moderators);

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
        throwErrorIfNotAdmin();
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
        const project = Projects.findOne({ _id: projectId }, { fields: { moderators: 1 } });

        throwErrorIfNotProjectModeratorOrAdmin(project, userId);
        throwErrorIfProjectDoesNotExist(project);

        if (members.length === 0) {
            return true;
        }

        return Projects.update({
            _id: projectId,
        }, {
            $addToSet: {
                members: { $each: members },
            },
        });
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

        throwErrorIfNotProjectModeratorOrAdmin(project, currentUserId);
        throwErrorIfProjectDoesNotExist(project);

        return Projects.update({
            _id: projectId,
        }, {
            $pull: {
                members: userId,
                moderators: userId,
            },
        });
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

        throwErrorIfNotProjectModeratorOrAdmin(project, userId);
        throwErrorIfProjectDoesNotExist(project);

        return Projects.update({ _id: projectId }, {
            $addToSet: {
                moderators: { $each: moderators },
                members: { $each: moderators },
            },
        });
    },
});

/**
 * Remove moderator from project
 * @param   {String}    projectId   project id
 * @param   {String}    userId      moderator userId
 * @return  {Boolean}               true if success
 */
export const removeModerator = new ValidatedMethod({
    name: 'projects.removeModerator',
    validate: ProjectIdAndUserIdSchema.validator({ clean: true }),
    run({ projectId, userId }) {
        const currentUserId = Meteor.userId();
        const project = Projects.findOne({ _id: projectId });

        throwErrorIfNotProjectModeratorOrAdmin(project, currentUserId);
        throwErrorIfProjectDoesNotExist(project);

        return Projects.update({
            _id: projectId,
        }, {
            $pull: {
                moderators: userId,
            },
        });
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
