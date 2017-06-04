import { browserHistory } from 'react-router';
import {
    addCategory,
    removeCategory,
} from './methods.js';

const addPostCategory = doc => addCategory.call(doc);

const removePostCategory = id => removeCategory.call({ id });

const goToCategoryManager = projectId => browserHistory.push(`/project/${projectId}/categories`);

export const actions = {
    addPostCategory,
    removePostCategory,
    goToCategoryManager,
};

export default actions;
