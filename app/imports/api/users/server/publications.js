import { Meteor } from 'meteor/meteor';

Meteor.publish("userList", function publishUserList() {
    const query = {};

    const options = {
        fields: {

        },
    };

    return Meteor.users.find(query, options);
});