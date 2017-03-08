import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Projects } from './../Projects.js';

const limitQueryToUserProjects = (userId, query) => {
    const user = Meteor.users.findOne(userId);
    const { isAdmin } = user;
    query = isAdmin ? query : query.members = user._id;
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
