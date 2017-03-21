import { Meteor } from 'meteor/meteor';

Meteor.publish('userList', () => {
    const query = {};

    const options = {
        fields: {
            services: 1,
        },
    };

    return Meteor.users.find(query, options);
});
