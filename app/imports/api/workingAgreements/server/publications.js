import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { isProjectMember } from '/imports/api/projects';
import { isAdmin } from '/imports/api/users';
import { Sprints } from '/imports/api/sprints';
import { WorkingAgreements } from './../WorkingAgreements.js';


Meteor.publish(
    'WorkingAgreements',
    function publishWorkingAgreements(sprintOrProjectId, isSprint = true,
) {
        check(sprintOrProjectId, String);
        check(isSprint, Boolean);

        const userId = this.userId;
        const isCurrentUserAdmin = isAdmin(userId);

        const query = isSprint ? { sprintId: sprintOrProjectId } : { projectId: sprintOrProjectId };

        if (isSprint) {
            const sprint = Sprints.findOne(sprintOrProjectId);
            const projectId = sprint.projectId;

            if (isProjectMember(projectId, userId) || isCurrentUserAdmin) {
                const options = {};

                return WorkingAgreements.find(query, options);
            }
        }
        if (isProjectMember(sprintOrProjectId, userId) || isCurrentUserAdmin) {
            const options = {};

            return WorkingAgreements.find(query, options);
        }
        return this.ready();
    });
