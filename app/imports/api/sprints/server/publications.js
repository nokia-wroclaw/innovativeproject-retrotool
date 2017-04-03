import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
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

    if (!this.userId) {
        return this.ready();
    }

    const query = {
        _id: sprintId,
    };

    const options = {};

    return Sprints.find(query, options);
});
