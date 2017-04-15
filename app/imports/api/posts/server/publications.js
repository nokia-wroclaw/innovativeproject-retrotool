import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { isProjectMember } from '/imports/api/projects';
import { Sprints } from '/imports/api/sprints';
import { isAdmin } from '/imports/api/users';
import {
    collectionName,
    Posts,
} from './../Posts';

const transforDoc = (doc) => {
    if (!doc.showAuthor) {
        doc.authorId = undefined;
    }
    return doc;
};

Meteor.publish('sprintPosts', function publishSprintPosts(sprintId) {
    check(sprintId, String);
    const self = this;

    const userId = self.userId;
    const sprint = Sprints.findOne(sprintId);

    const { projectId = null } = sprint;

    const isMember = isProjectMember(projectId, userId);
    const isCurrentUserAdmin = isAdmin(userId);

    if (isMember || isCurrentUserAdmin) {
        const cursor = Posts.find({ sprintId });

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
