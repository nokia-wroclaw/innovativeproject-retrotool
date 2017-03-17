import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Sprints } from './../Sprints.js';


const limitQueryToUserSprints = (userId, query) => {
    const user = Meteor.users.findOne(userId);
    const { isAdmin } = user;
    if (!isAdmin && query && !query.members) {
        query.members = userId;
    }
    return query;
};

Meteor.publish('sprintList', function publishSprintList(projectId) {
    check(projectId, String);

    if (!this.userId) {
        return this.ready();
    }
    const query = { projectId };
    limitQueryToUserSprints(this.userId, query);

    const options = {
        fields: {
            name: 1,
        },
    };

    return Sprints.find(query, options);
});
