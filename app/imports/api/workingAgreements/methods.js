//  import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { WorkingAgreements } from './WorkingAgreements.js';
import {
    WorkingAgreementsSchema,
    romoveWorkingAgreementsSchema,
} from './schema.js';

export const addWorkingAgreement = new ValidatedMethod({
    name: 'workingAgreement.add',
    validate: WorkingAgreementsSchema.validator({ clean: true }),
    run({ sprintId, text, date }) {
        return WorkingAgreements.insert({ sprintId, text, date });
    },
});

export const removeWorkingAgreement = new ValidatedMethod({
    name: 'workingAgreement.remove',
    validate: romoveWorkingAgreementsSchema.validator({ clean: true }),
    run({ workingAgreementId }) {
        return WorkingAgreements.remove({ _id: workingAgreementId });
    },
});
