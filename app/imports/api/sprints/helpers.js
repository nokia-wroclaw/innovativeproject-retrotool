import { Sprints } from './Sprints.js';

export const isSprintClosed = sprintId =>
    !!Sprints.findOne({ _id: sprintId, closed: true });
