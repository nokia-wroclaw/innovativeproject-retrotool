import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { isProjectMember } from '/imports/api/projects';
import { isAdmin } from '/imports/api/users';
import { Sprints } from '/imports/api/sprints';
import { ActionItems } from './../ActionItems.js';


Meteor.publish('actionItems', function publishActionItems(sprintOrProjectId, type = 'sprintId') {
    check(sprintOrProjectId, String);
    check(type, String);

    const userId = this.userId;
    const isCurrentUserAdmin = isAdmin(userId);

    if (type === 'sprintId') {
        const sprintId = sprintOrProjectId;
        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;

        if (isProjectMember(projectId, userId) || isCurrentUserAdmin) {
            const query = { sprintId };

            const options = {};

            return ActionItems.find(query, options);
        }
    } else if (type === 'projectId') {
        const projectId = sprintOrProjectId;

        if (isProjectMember(projectId, userId) || isCurrentUserAdmin) {
            const query = { projectId };

            const options = {};

            return ActionItems.find(query, options);
        }
    }
    return this.ready();
});
