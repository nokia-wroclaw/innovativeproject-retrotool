import { addComment } from './methods.js';

const addPostComment = ({ postId, showAuthor, text }) =>
    addComment.call({ postId, showAuthor, text });

const actions = {
    addPostComment,
};

export { actions };
