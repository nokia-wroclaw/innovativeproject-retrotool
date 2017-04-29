import { browserHistory } from 'react-router';
import {
    addActionItem,
    closeOrReopenActionItem,
} from './methods.js';


const goToActionItems = (projectId, sprintId) =>
    browserHistory.push(`/project/${projectId}/sprint/${sprintId}/action-items`);

const createActionItem = (sprintId, startDate, endDate, executorId, text) =>
    new Promise((resolve, reject) => {
        addActionItem.call({ sprintId, startDate, endDate, executorId, text }, (err, res) => {
            if (err) {
                const error = new Error(err.reason || err);
                reject(error);
            }
            resolve(res);
        });
    });

const toggleActionItemState = (actionItemId, closeMessage) => new Promise((resolve, reject) => {
    closeOrReopenActionItem.call({ actionItemId, closeMessage }, (err, res) => {
        if (err) {
            const error = new Error(err.reason || err);
            reject(error);
        }
        resolve(res);
    });
});

const actions = {
    goToActionItems,
    createActionItem,
    toggleActionItemState,
};

export { actions };
