import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { isProjectMember } from '/imports/api/projects';
import { Sprints } from '/imports/api/sprints';
import { WorkingAgreements } from './WorkingAgreements.js';
import {
    WorkingAgreementsSchema,
    romoveWorkingAgreementsSchema,
} from './schema.js';

export const addWorkingAgreement = new ValidatedMethod({
    name: 'workingAgreement.add',
    validate: WorkingAgreementsSchema.validator({ clean: true }),
    run({ sprintId, text, date }) {
        const userId = Meteor.userId();

        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;

        if (isProjectMember(projectId, userId)) {
            return WorkingAgreements.insert({ sprintId, text, date });
        }
        throw new Meteor.Error(
            'working-agreements-only-members-can-add',
            'Only member can add new working agreement',
        );
    },
});

export const removeWorkingAgreement = new ValidatedMethod({
    name: 'workingAgreement.remove',
    validate: romoveWorkingAgreementsSchema.validator({ clean: true }),
    run({ workingAgreementId }) {
        const userId = Meteor.userId();

        const workingAgreement = WorkingAgreements.findOne(workingAgreementId);
        const sprintId = workingAgreement.sprintId;
        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;

        if (isProjectMember(projectId, userId)) {
            return WorkingAgreements.remove({ _id: workingAgreementId });
        }
        throw new Meteor.Error(
            'working-agreements-only-members-can-remove',
            'Only member can remove working agreements',
        );
    },
});
