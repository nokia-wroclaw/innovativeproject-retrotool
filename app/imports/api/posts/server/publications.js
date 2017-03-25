import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {
    Projects,
    isProjectMember,
} from '/imports/api/projects';

import { Posts } from '../Posts';


Meteor.publish('projectPosts', function publishProjectPosts(projectId) {
    check(projectId, String);

    const userId = this.userId();
    const project = Projects.findOne(projectId);

    if (isProjectMember(project, userId)) { // @TODO or isAdmin, server-side helpers?
        Posts.find({ projectId });
    }

    return this.ready();
});
