import { browserHistory } from 'react-router';
import {
    addWorkingAgreement,
    removeWorkingAgreement,
} from './methods.js';

const goToWorkingAgreement = (projectId, sprintId, workingAgreementId) =>
    browserHistory.push(`/project/${
        projectId}/sprint/${
            sprintId}/working-agreement/${
                workingAgreementId}`);

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
    goToWorkingAgreement,
    deleteWorkingAgreement,
};

export { actions };
