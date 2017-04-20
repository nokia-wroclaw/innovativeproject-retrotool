import { Mongo } from 'meteor/mongo';

import { PostSchema } from './schema.js';

export const collectionName = 'posts';
const Posts = new Mongo.Collection(collectionName);

Posts.attachSchema(PostSchema);

export { Posts };
