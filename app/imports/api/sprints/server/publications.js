import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
<<<<<<< HEAD
=======
import {
    Projects,
    isProjectMember,
} from '/imports/api/projects';
>>>>>>> origin/devel
import { Sprints } from './../Sprints.js';


Meteor.publish('sprintList', function publishSprintList(projectId) {
    check(projectId, String);

<<<<<<< HEAD
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
=======
    const project = Projects.findOne(projectId);

    const userId = this.userId;
    const { isAdmin = false } = Meteor.users.findOne(userId);

    if (isProjectMember(project, userId) || isAdmin) {
        const query = { projectId };

        const options = {
            fields: {
                name: 1,
            },
        };

        return Sprints.find(query, options);
    }

    return this.ready;
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
>>>>>>> origin/devel
});
