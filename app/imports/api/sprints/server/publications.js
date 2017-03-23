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
