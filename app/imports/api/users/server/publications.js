import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { isAdmin } from '/imports/api/users';
import {
    Projects,
    isProjectMember,
} from '/imports/api/projects';

Meteor.publish('userList', function publishUserList(projectId = null) {
    const userId = this.userId;

    const query = {};
    const options = {
        fields: {
            isAdmin: 1,
            'profile.name': 1,
            'profile.avatar': 1,
        },
    };

    if (projectId) {
        check(projectId, String);
        const isMember = isProjectMember(projectId, userId);
        if (isMember) {
            const project = Projects.findOne(projectId);
            query._id = { $in: project.members };
            return Meteor.users.find(query, options);
        }
    }

    const isCurrentUserAdmin = isAdmin(userId);
    if (isCurrentUserAdmin) {
        return Meteor.users.find(query, options);
    }

    return this.ready();
});

Meteor.publish('extendedUser', function publishExtendedUser() {
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
});

Meteor.publish('userEmail', function publishExtendedUser() {
    const userId = this.userId;

    if (userId) {
        return Meteor.users.find(userId, {
            fields: {
                'services.github.email': 1,
            },
        });
    }
    return this.ready();
});
