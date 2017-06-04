import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { isProjectMember } from '/imports/api/projects';
import { isAdmin } from '/imports/api/users';
import { Sprints } from '/imports/api/sprints';
import { ActionItems } from './../ActionItems.js';


Meteor.publish('actionItems', function publishActionItems(sprintOrProjectId, isSprint = true) {
    check(sprintOrProjectId, String);
    check(isSprint, Boolean);

    const getProjectId = (sprintId) => {
        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;
        return projectId;
    };

    const userId = this.userId;
    const isCurrentUserAdmin = isAdmin(userId);

    const query = isSprint ? { sprintId: sprintOrProjectId } : { projectId: sprintOrProjectId };
    const projectId = isSprint ? getProjectId(sprintOrProjectId) : sprintOrProjectId;

    if (isProjectMember(projectId, userId) || isCurrentUserAdmin) {
        const options = {};

        return ActionItems.find(query, options);
    }
    return this.ready();
});
