import { browserHistory } from 'react-router';
import { addWorkingAgreement } from './methods.js';

const goToWorkingAgreement = (projectId, sprintId, workingAgreementId) =>
    browserHistory.push(`/project/${projectId}/sprint/${sprintId}/working-agreement/${workingAgreementId}`);

const createWorkingAgreement = (projectId, text, date) => new Promise((resolve, reject) => {
    addWorkingAgreement.call({
        projectId,
        text,
        date,
    }, (err, res) => {
        if (err) {
            err = err.reason || err;
            return reject(new Error(err));
        }
        return resolve(res);
    });
});

const actions = { createWorkingAgreement };

export { actions };
