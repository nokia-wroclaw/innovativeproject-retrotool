import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { isProjectMember, isProjectModerator } from '/imports/api/projects';
import { Sprints } from '/imports/api/sprints';
import { WorkingAgreements } from './WorkingAgreements.js';
import {
    AddWorkingAgreementsSchema,
    RemoveWorkingAgreementsSchema,
} from './schema.js';

export const addWorkingAgreement = new ValidatedMethod({
    name: 'workingAgreement.add',
    validate: AddWorkingAgreementsSchema.validator({ clean: true }),
    run({ sprintId, text, date }) {
        const userId = Meteor.userId();

        const sprint = Sprints.findOne(sprintId);

        if (sprint.closed === true) {
            throw new Meteor.Error(
                'working-agreements-only-open-sprint-add',
                'You can add new working agreement only in open sprints',
            );
        }

        const projectId = sprint.projectId;

        if (isProjectMember(projectId, userId)) {
            return WorkingAgreements.insert({ projectId, sprintId, text, date });
        }
        throw new Meteor.Error(
            'working-agreements-only-members-can-add',
            'Only member can add new working agreement',
        );
    },
});

export const removeWorkingAgreement = new ValidatedMethod({
    name: 'workingAgreement.remove',
    validate: RemoveWorkingAgreementsSchema.validator({ clean: true }),
    run({ workingAgreementId }) {
        const userId = Meteor.userId();

        const workingAgreement = WorkingAgreements.findOne(workingAgreementId);
        const sprintId = workingAgreement.sprintId;
        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;

        if (isProjectModerator(projectId, userId)) {
            return WorkingAgreements.remove(workingAgreementId);
        }
        throw new Meteor.Error(
            'working-agreements-only-moderator-can-remove',
            'Only moderator can remove working agreements',
        );
    },
});
