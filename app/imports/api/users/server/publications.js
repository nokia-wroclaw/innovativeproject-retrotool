import { Meteor } from 'meteor/meteor';
<<<<<<< HEAD

Meteor.publish('userList', () => {
    const query = {};

    const options = {
        fields: {
            'services.github.username': 1,
        },
    };

    return Meteor.users.find(query, options);
=======
import { check } from 'meteor/check';

import {
    Projects,
    isProjectMember,
} from '/imports/api/projects';

Meteor.publish('userList', function publishUserList(projectId = null) {
    const userId = this.userId;

    const query = {};
    const options = {
        fields: {
            'profile.name': 1,
            'profile.avatar': 1,
        },
    };

    if (projectId) {
        check(projectId, String);
        const project = Projects.findOne(projectId);
        const isMember = project && isProjectMember(project, userId);
        if (isMember) {
            query._id = { $in: project.members };
            return Meteor.users.find(query, options);
        }
    }

    const { isAdmin } = Meteor.users.findOne(userId);
    if (isAdmin) {
        return Meteor.users.find(query, options);
    }

    return this.ready();
});

Meteor.publish('extendedUser', function publishExtendedUser() {
    // @XXX walkaround, temporary solution, change after PR!!
    const userId = this.userId;

    if (!userId) {
        this.ready();
    }

    return Meteor.users.find({
        _id: userId,
    }, {
        fields: {
            profile: 1,
            isAdmin: 1,
        },
    });
>>>>>>> origin/devel
});
