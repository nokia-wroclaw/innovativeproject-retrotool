import { Mongo } from 'meteor/mongo';

import { CommentSchema } from './schema.js';

const Comments = new Mongo.Collection('comments');

Comments.attachSchema(CommentSchema);

export { Comments };
