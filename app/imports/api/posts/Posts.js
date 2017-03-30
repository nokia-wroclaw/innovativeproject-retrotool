import { Mongo } from 'meteor/mongo';

import { PostSchema } from './schema.js';

const Posts = new Mongo.Collection('posts');

Posts.attachSchema(PostSchema);

export { Posts };
