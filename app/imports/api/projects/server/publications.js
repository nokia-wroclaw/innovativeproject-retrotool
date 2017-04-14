import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Projects } from './../Projects.js';
import { isProjectMember } from './../helpers.js';

/**
 * If user is not admin limit query to current user projects
 * Works only if query doesn't have property `members`
 * @param  {String} userId Current userId
 * @param  {Object} query  Mongo query
 * @return {Object}        Updated mongo query
 */
const limitQueryToUserProjects = (userId, query) => {
    const user = Meteor.users.findOne(userId);
    const { isAdmin } = user;
    if (!isAdmin && query && !query.members) {
        query.members = userId;
    }
    return query;
};

Meteor.publish('projectList', function publishProjectList() {
    if (!this.userId) {
        return this.ready();
    }
    const query = {};
    limitQueryToUserProjects(this.userId, query);

    const options = {
        fields: {
            name: 1,
        },
    };

    return Projects.find(query, options);
});

Meteor.publish('singleProject', function publishSingleProject(projectId) {
    check(projectId, String);

    if (!this.userId) {
        return this.ready();
    }

    const query = {
        _id: projectId,
    };

    limitQueryToUserProjects(this.userId, query);

    const options = {};

    return Projects.find(query, options);
});


Meteor.publish('projectMembers', function publishProjectMembers(projectId) {
    check(projectId, String);

    const userId = this.userId;
    const project = Projects.findOne(projectId);
    const memberIds = project && project.members;

    const isMember = isProjectMember(project, userId);
    const { isAdmin } = Meteor.users.findOne(userId);

    if (isMember || isAdmin) {
        return Meteor.users.find({
            _id: {
                $in: memberIds,
            },
        }, {
            fields: {
                'profile.name': 1,
                'profile.avatar': 1,
            },
        });
    }
    return this.ready();
});
