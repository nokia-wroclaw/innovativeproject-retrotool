import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
//  import { isProjectMember } from '/imports/api/projects';
//  import { isAdmin } from '/imports/api/users';
import { WorkingAgreements } from './../WorkingAgreements.js';

Meteor.publish('WorkingAgreementsList', function publishWorkingAgreements(sprintId) {
    check(sprintId, String);

    return WorkingAgreements.find(sprintId);
});


Meteor.publish('singleWorkingAgreement',
    function publishSingleWorkingAgreement(workingAgreementId) {
        check(workingAgreementId, String);

        return WorkingAgreements.find(workingAgreementId);
    });
