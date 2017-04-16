import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { isProjectMember } from '/imports/api/projects';
import { getProjectIdByPostId } from '/imports/api/posts';
import {
    collectionName,
    Comments,
} from './../Comments.js';

const transforDoc = (doc) => {
    if (!doc.showAuthor) {
        doc.authorId = undefined;
    }
    return doc;
};

Meteor.publish('postComments', function publishPostComments(postId) {
    check(postId, String);
    const self = this;
    const userId = self.userId;
    const projectId = getProjectIdByPostId(postId);

    if (isProjectMember(projectId, userId)) {
        const cursor = Comments.find({ postId });

        cursor.observe({
            added(newDoc) {
                newDoc = transforDoc(newDoc);
                self.added(collectionName, newDoc._id, newDoc);
            },
            changed(newDoc) {
                newDoc = transforDoc(newDoc);
                self.changed(collectionName, newDoc._id, newDoc);
            },
            removed(oldDoc) {
                self.removed(collectionName, oldDoc._id);
            },
        });
    }

    self.ready();
    self.onStop(() => self.stop());
});
