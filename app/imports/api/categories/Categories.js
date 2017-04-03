import { Mongo } from 'meteor/mongo';

import { CategorySchema } from './schema.js';

const Categories = new Mongo.Collection('categories');

Categories.attachSchema(CategorySchema);

export { Categories };
