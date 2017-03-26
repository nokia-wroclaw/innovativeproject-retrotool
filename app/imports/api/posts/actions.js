import { browserHistory } from 'react-router';
import { addPost as addPostMethod } from './methods.js';

const addPost = ({ text, showAuthor, projectId }, callback = () => {}) =>
    addPostMethod.call({ text, showAuthor, projectId }, callback);

const goToPosts = projectId =>
    browserHistory.push(`/project/${projectId}/wall`);

const actions = {
    addPost,
    goToPosts,
};

export { actions };
