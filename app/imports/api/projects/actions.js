import { browserHistory } from 'react-router';
import {
    createProject,
    removeModerator,
    addModerators,
    updateProject,
    removeMember as removeMemberMethod,
    setLastViewedProject as setLastViewedProjectMethod,
    starProject as starProjectMethod,
    unstarProject as unstarProjectMethod,
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

const removeMember = (projectId, userId) => removeMemberMethod.call({ projectId, userId });
const addMembers = doc => updateProject.call(doc);


const setLastViewedProject = projectId => setLastViewedProjectMethod.call({ projectId });
const starProject = projectId => starProjectMethod.call({ projectId });
const unstarProject = projectId => unstarProjectMethod.call({ projectId });

const actions = {
    goToProject,
    goToAddProject,
    createNewProject,
    addModerator,
    removeMod,
    setLastViewedProject,
    starProject,
    unstarProject,
    addMembers,
    removeMember,
};

export { actions };
