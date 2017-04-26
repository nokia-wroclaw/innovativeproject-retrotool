import { browserHistory } from 'react-router';
import {
    addWorkingAgreement,
    removeWorkingAgreement,
} from './methods.js';

const goToWorkingAgreements = (projectId, sprintId) =>
    browserHistory.push(`/project/${projectId}/sprint/${sprintId}/working-agreement`);


const createWorkingAgreement = (sprintId, text, date, callback = () => {}) =>
    addWorkingAgreement.call({ sprintId, text, date }, callback);

const deleteWorkingAgreement = (workingAgreementId, callback = () => {}) =>
    removeWorkingAgreement.call({ workingAgreementId }, callback);

const actions = {
    createWorkingAgreement,
    goToWorkingAgreements,
    deleteWorkingAgreement,
};

export { actions };
