import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { isProjectMember } from '/imports/api/projects';
import { getProjectIdByPostId } from '/imports/api/posts';
import { Comments } from './../Comments.js';

Meteor.publish('postComments', function publishPostComments(postId) {
    check(postId, String);
    const userId = this.userId;
    const projectId = getProjectIdByPostId(postId);

    if (isProjectMember(projectId, userId)) {
        return Comments.find({ postId });
    }
    return this.ready();
});
