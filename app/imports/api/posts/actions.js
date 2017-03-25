import { addPost as addPostMethod } from './methods.js';

const addPost = ({ text, showAuthor }, callback = () => {}) =>
    addPostMethod.call({ text, showAuthor }, callback);

const actions = {
    addPost,
};

export { actions };
