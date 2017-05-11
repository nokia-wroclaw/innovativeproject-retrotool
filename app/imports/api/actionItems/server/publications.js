import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { isProjectMember } from '/imports/api/projects';
import { isAdmin } from '/imports/api/users';
import { Sprints } from '/imports/api/sprints';
import { ActionItems } from './../ActionItems.js';

Meteor.publish('actionItems', function publishActionItems(sprintId) {
    check(sprintId, String);

    const userId = this.userId;
    const isCurrentUserAdmin = isAdmin(userId);

    const sprint = Sprints.findOne(sprintId);
    const projectId = sprint.projectId;

    if (isProjectMember(projectId, userId) || isCurrentUserAdmin) {
        const query = { sprintId };

        const options = {};

        return ActionItems.find(query, options);
    }
    return this.ready();
});

Meteor.publish('projectActionItems', function publishProjectActionItems(projectId) {
    check(projectId, String);

    const userId = this.userId;
    const isCurrentUserAdmin = isAdmin(userId);

    if (isProjectMember(projectId, userId) || isCurrentUserAdmin) {
        const query = { projectId };

        const options = {};

        return ActionItems.find(query, options);
    }
    return this.ready();
});
