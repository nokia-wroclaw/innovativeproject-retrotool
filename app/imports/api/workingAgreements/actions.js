import { browserHistory } from 'react-router';
import {
    addWorkingAgreement,
    removeWorkingAgreement,
} from './methods.js';

const goToWorkingAgreements = (projectId, sprintId) =>
    browserHistory.push(`/project/${projectId}/sprint/${sprintId}/working-agreement`);

const createWorkingAgreement = (sprintId, text, date) => new Promise((resolve, reject) => {
    addWorkingAgreement.call({
        sprintId,
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

const deleteWorkingAgreement = workingAgreementId => new Promise((resolve, reject) => {
    removeWorkingAgreement.call({
        workingAgreementId,
    }, (err, res) => {
        if (err) {
            err = err.reason || err;
            return reject(new Error(err));
        }
        return resolve(res);
    });
});

const actions = {
    createWorkingAgreement,
    goToWorkingAgreements,
    deleteWorkingAgreement,
};

export { actions };
