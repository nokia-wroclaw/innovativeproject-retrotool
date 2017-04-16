import { browserHistory } from 'react-router';
import {
    addPost as addPostMethod,
    removePost as removePostMethod,
} from './methods.js';

const addPost = (args, callback = () => {}) =>
    addPostMethod.call({ ...args }, callback);

const removePost = (postId, callback) =>
    removePostMethod.call({ postId }, callback);

const goToPosts = (projectId, sprintId) =>
    browserHistory.push(`/project/${projectId}/sprint/${sprintId}/wall`);

const actions = {
    addPost,
    removePost,
    goToPosts,
};

export { actions };
