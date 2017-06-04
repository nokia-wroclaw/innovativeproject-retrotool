import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { isProjectMember } from '/imports/api/projects';
import { Categories } from './../Categories.js';

Meteor.publish('categories', function publishCategories(projectId = '') {
    check(projectId, String);
    if (!this.userId) {
        return this.ready();
    }

    const query = {};

    if (projectId) {
        const isMember = isProjectMember(projectId, this.userId);
        if (isMember) {
            query.$or = [
                { projectId },
                { projectId: { $exists: false } },
            ];
        }
    } else {
        query.projectId = { $exists: false };
    }

    return Categories.find(query);
});
