import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { isAdmin } from '/imports/api/users';
import { isProjectMember } from '/imports/api/projects';
import { Sprints } from './../Sprints.js';

Meteor.publish('sprintList', function publishSprintList(projectId) {
    check(projectId, String);

    const userId = this.userId;
    const isCurrentUserAdmin = isAdmin(userId);

    if (isProjectMember(projectId, userId) || isCurrentUserAdmin) {
        const query = { projectId };

        const options = {
            fields: {
                name: 1,
                projectId: 1,
                closed: 1,
                createdAt: 1,
            },
        };

        return Sprints.find(query, options);
    }

    return this.ready();
});


Meteor.publish('singleSprint', function publishSingleSprint(sprintId) {
    check(sprintId, String);
    const sprint = Sprints.findOne(sprintId);
    const projectId = sprint && sprint.projectId;

    const userId = this.userId;
    const isCurrentUserAdmin = isAdmin(userId);

    if (isProjectMember(projectId, userId) || isCurrentUserAdmin) {
        return Sprints.find(sprintId);
    }
    return this.ready();
});
