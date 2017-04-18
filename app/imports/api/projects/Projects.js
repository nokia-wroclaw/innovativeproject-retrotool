import { Mongo } from 'meteor/mongo';

import { ProjectSchema } from './schema.js';

const Projects = new Mongo.Collection('projects');

Projects.attachSchema(ProjectSchema);

export { Projects };
