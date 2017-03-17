import { browserHistory } from 'react-router';
import { createProject } from './methods.js';

const goToProject = projectId => browserHistory.push(`/project/${projectId}`);
const goToAddProject = () => browserHistory.push('/create-project');

const createNewProject = (name, moderators, members) => createProject.call({
    name,
    moderators,
    members,
}, (err, res) => {
    if (err) {
        return err;
    }
    return res;
});

const actions = {
    goToProject,
    goToAddProject,
    createNewProject,
};

export { actions };
