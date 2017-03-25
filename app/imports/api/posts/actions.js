import { addPost as addPostMethod } from './methods.js';

const addPost = ({ text, showAuthor }) =>
    addPostMethod.call({ text, showAuthor });

const actions = {
    addPost,
};

export { actions };
