import { addComment } from './methods.js';

const addPostComment = ({ postId, showAuthor, text }) => new Promise((resolve, reject) => {
    addComment.call({ postId, showAuthor, text }, (error, result) => {
        if (error) {
            error = error.reason || error;
            reject(new Error(error));
        }
        resolve(result);
    });
});

const actions = {
    addPostComment,
};

export { actions };
