import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Comments } from './../Comments.js';

Meteor.publish('postComments', function publishPostComments(postId) {
    check(postId, String);
    // @TODO add user verification

    return Comments.find({ postId });
});
