import { Mongo } from 'meteor/mongo';

import { CommentSchema } from './schema.js';

export const collectionName = 'comments';
const Comments = new Mongo.Collection(collectionName);

Comments.attachSchema(CommentSchema);

export { Comments };
