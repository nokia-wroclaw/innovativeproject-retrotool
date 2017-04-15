import { Mongo } from 'meteor/mongo';

import { SprintSchema } from './schema.js';

const Sprints = new Mongo.Collection('sprints');

Sprints.attachSchema(SprintSchema);

export { Sprints };
