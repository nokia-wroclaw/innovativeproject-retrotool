import { browserHistory } from 'react-router';
import {
    addPost as addPostMethod,
    removePost as removePostMethod,
    likePost as likePostMethod,
} from './methods.js';

const addPost = (args, callback = () => {}) =>
    addPostMethod.call({ ...args }, callback);

const removePost = (postId, callback) =>
    removePostMethod.call({ postId }, callback);

const likePost = postId =>
    likePostMethod.call({ postId });

const goToPosts = (projectId, sprintId) =>
    browserHistory.push(`/project/${projectId}/sprint/${sprintId}/wall`);

const actions = {
    addPost,
    removePost,
    likePost,
    goToPosts,
};

export { actions };
