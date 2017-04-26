import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
//  import { isProjectMember } from '/imports/api/projects';
//  import { isAdmin } from '/imports/api/users';
import { WorkingAgreements } from './../WorkingAgreements.js';

Meteor.publish('WorkingAgreements', function publishWorkingAgreements(sprintId) {
    check(sprintId, String);
    const query = { sprintId };

    const options = {};

    return WorkingAgreements.find(query, options);
});
