import { browserHistory } from 'react-router';

const goToProject = projectId => browserHistory.push(`/project/${projectId}`);

const actions = {
    goToProject,
};

export { actions };
