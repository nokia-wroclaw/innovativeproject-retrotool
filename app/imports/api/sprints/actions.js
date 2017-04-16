import { browserHistory } from 'react-router';
import { addSprint } from './methods.js';

const goToSprint = (projectId, sprintId) =>
    browserHistory.push(`/project/${projectId}/sprint/${sprintId}`);

const goToAddSprint = projectId => browserHistory.push(`/project/${projectId}/add-sprint`);

const addNewSprint = (name, projectId) => new Promise((resolve, reject) => {
    addSprint.call({ name, projectId }, (err, res) => {
        if (err) {
            const error = new Error(err.reason || err);
            reject(error);
        }
        resolve(res);
    });
});

const actions = {
    goToSprint,
    goToAddSprint,
    addNewSprint,
};


export { actions };
