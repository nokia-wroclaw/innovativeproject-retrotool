import { browserHistory } from 'react-router';
import {
    addPost as addPostMethod,
    removePost as removePostMethod,
    likePost as likePostMethod,
    dislikePost as dislikePostMethod,
} from './methods.js';

const addPost = (args, callback = () => {}) =>
    addPostMethod.call({ ...args }, callback);

const removePost = (postId, callback) =>
    removePostMethod.call({ postId }, callback);

const likePost = postId =>
    likePostMethod.call({ postId });

const dislikePost = postId =>
    dislikePostMethod.call({ postId });

const goToPosts = (projectId, sprintId) =>
    browserHistory.push(`/project/${projectId}/sprint/${sprintId}/wall`);

const actions = {
    addPost,
    removePost,
    likePost,
    dislikePost,
    goToPosts,
};

export { actions };
