import { browserHistory } from 'react-router';
import {
    addPost as addPostMethod,
    removePost as removePostMethod,
    likePost as likePostMethod,
    removeLike as removeLikeMethod,
    dislikePost as dislikePostMethod,
    removeDislike as removeDislikeMethod,
} from './methods.js';

const addPost = (args, callback = () => {}) =>
    addPostMethod.call({ ...args }, callback);

const removePost = (postId, callback) =>
    removePostMethod.call({ postId }, callback);

const likePost = postId =>
    likePostMethod.call({ postId });

const removeLike = postId =>
    removeLikeMethod.call({ postId });

const dislikePost = postId =>
    dislikePostMethod.call({ postId });

const removeDislike = postId =>
    removeDislikeMethod.call({ postId });

const goToPosts = (projectId, sprintId) =>
    browserHistory.push(`/project/${projectId}/sprint/${sprintId}/wall`);

const actions = {
    addPost,
    removePost,
    likePost,
    removeLike,
    dislikePost,
    removeDislike,
    goToPosts,
};

export { actions };
