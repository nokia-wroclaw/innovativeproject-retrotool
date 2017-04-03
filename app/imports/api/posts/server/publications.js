import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {
    Projects,
    isProjectMember,
} from '/imports/api/projects';
import {
    Sprints,
} from '/imports/api/sprints';

import { Posts } from '../Posts';


Meteor.publish('sprintPosts', function publishSprintPosts(sprintId) {
    check(sprintId, String);

    const userId = this.userId;
    const sprint = Sprints.findOne(sprintId);
    const { projectId = null } = sprint;
    const project = Projects.findOne(projectId);

    const isMember = isProjectMember(project, userId);
    const { isAdmin } = Meteor.users.findOne(userId);

    if (isMember || isAdmin) {
        return Posts.find({ sprintId });
    }

    return this.ready();
});
