import { browserHistory } from 'react-router';
import {
    createProject,
    removeModerator,
    addModerators,
 } from './methods.js';

const goToProject = projectId => browserHistory.push(`/project/${projectId}`);
const goToAddProject = () => browserHistory.push('/create');

const createNewProject = (name, moderators, members) => new Promise((resolve, reject) => {
    createProject.call({
        name,
        moderators,
        members,
    }, (err, res) => {
        if (err) {
            err = err.reason || err;
            return reject(new Error(err));
        }
        return resolve(res);
    });
});

const addModerator = (projectId, moderators) => new Promise((resolve, reject) => {
    addModerators.call({
        projectId,
        moderators,
    }, (err, res) => {
        if (err) {
            err = err.reason || err;
            return reject(new Error(err));
        }
        return resolve(res);
    });
});

const removeMod = (projectId, userId) => {
    removeModerator.call({
        projectId,
        userId,
    });
};

const actions = {
    goToProject,
    goToAddProject,
    createNewProject,
    addModerator,
    removeMod,
};

export { actions };
