import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {
    Projects,
    isProjectMember,
} from '/imports/api/projects';
import { Sprints } from './../Sprints.js';


Meteor.publish('sprintList', function publishSprintList(projectId) {
    check(projectId, String);

    if (!this.userId) {
        return this.ready();
    }
    const query = { projectId };

    const options = {
        fields: {
            name: 1,
        },
    };

    return Sprints.find(query, options);
});


Meteor.publish('singleSprint', function publishSingleSprint(sprintId) {
    check(sprintId, String);
    const sprint = Sprints.findOne(sprintId);
    const { projectId = null } = sprint;
    const project = Projects.findOne(projectId);

    const userId = this.userId;
    const { isAdmin = false } = Meteor.users.findOne(userId);

    if (isProjectMember(project, userId) || isAdmin) {
        return Sprints.find(sprintId);
    }
    return this.ready;
});
