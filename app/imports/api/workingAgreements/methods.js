//  import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { WorkingAgreements } from './WorkingAgreements.js';
import { WorkingAgreementsSchema } from './schema.js';

export const addWorkingAgreement = new ValidatedMethod({
    name: 'workingAgreement.add',
    validate: WorkingAgreementsSchema.validator({ clean: true }),
    run({ sprintId, text, date }) {
        return WorkingAgreements.insert({ sprintId, text, date });
    },
});
