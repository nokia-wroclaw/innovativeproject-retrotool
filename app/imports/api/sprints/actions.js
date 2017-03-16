import { browserHistory } from 'react-router';
import { addSprint } from './methods.js';

const goToAddSprint = projectId => browserHistory.push(`/project/${projectId}/add-sprint`);

const addNewSprint = (name, projectId) => addSprint.call({ name, projectId }, (err, res) => {
    if (err) {
        return err;
    }
    return res;
});

const actions = {
    goToAddSprint,
    addNewSprint,
};


export { actions };
