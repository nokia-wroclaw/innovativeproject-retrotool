import { Mongo } from 'meteor/mongo';

import { WorkingAgreementsSchema } from './schema.js';

const WorkingAgreements = new Mongo.Collection('workingAgreements');

WorkingAgreements.attachSchema(WorkingAgreementsSchema);

export { WorkingAgreements };
