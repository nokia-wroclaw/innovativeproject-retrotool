import { Meteor } from 'meteor/meteor';

Meteor.publish('allUsers', function publishAllUsers() { // @TODO limit to project, remove this pub
    // @TODO check permissions!
    // @TODO limit to project
    // @TODO add avatar

    return Meteor.users.find({}, {
        fields: {
            'profile.name': 1,
            'profile.avatar': 1,
        },
    });
});
