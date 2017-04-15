import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { isProjectMember } from '/imports/api/projects';
import { Sprints } from '/imports/api/sprints';
import { isAdmin } from '/imports/api/users';
import { Posts } from '../Posts';


Meteor.publish('sprintPosts', function publishSprintPosts(sprintId) {
    check(sprintId, String);

    const userId = this.userId;
    const sprint = Sprints.findOne(sprintId);

    const { projectId = null } = sprint;

    const isMember = isProjectMember(projectId, userId);
    const isCurrentUserAdmin = isAdmin(userId);

    if (isMember || isCurrentUserAdmin) {
        return Posts.find({ sprintId });
    }

    return this.ready();
});
