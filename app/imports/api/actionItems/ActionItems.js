import { Mongo } from 'meteor/mongo';

import { ActionItemsSchema } from './schema.js';

const ActionItems = new Mongo.Collection('actionItems');

ActionItems.attachSchema(ActionItemsSchema);

export { ActionItems };
