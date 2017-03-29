import { browserHistory } from 'react-router';
import { addPost as addPostMethod } from './methods.js';

const addPost = (args, callback = () => {}) =>
    addPostMethod.call({ ...args }, callback);

const goToPosts = projectId =>
    browserHistory.push(`/project/${projectId}/wall`);

const actions = {
    addPost,
    goToPosts,
};

export { actions };
