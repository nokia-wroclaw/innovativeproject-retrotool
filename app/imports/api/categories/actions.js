import {
    addCategory,
    removeCategory,
} from './methods.js';

const addPostCategory = doc => addCategory.call(doc);

const removePostCategory = id => removeCategory.call({ id });

export const actions = {
    addPostCategory,
    removePostCategory,
};

export default actions;
