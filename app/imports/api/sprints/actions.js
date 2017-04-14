import { browserHistory } from 'react-router';
import { addSprint } from './methods.js';

<<<<<<< HEAD
=======
const goToSprint = (projectId, sprintId) =>
    browserHistory.push(`/project/${projectId}/sprint/${sprintId}`);
>>>>>>> origin/devel
const goToAddSprint = projectId => browserHistory.push(`/project/${projectId}/add-sprint`);

const addNewSprint = (name, projectId) => addSprint.call({ name, projectId }, (err, res) => {
    if (err) {
        return err;
    }
    return res;
});

const actions = {
<<<<<<< HEAD
=======
    goToSprint,
>>>>>>> origin/devel
    goToAddSprint,
    addNewSprint,
};


export { actions };
