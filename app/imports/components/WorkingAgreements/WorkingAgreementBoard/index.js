import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { withRouter } from 'react-router';

import {
    WorkingAgreements as workingAgreementCollection,
    actions as workingAgreementActions,
} from '/imports/api/workingAgreements';

import { isProjectMember, isProjectModerator } from '/imports/api/projects';
import { Sprints } from '/imports/api/sprints';

import WorkingAgreements from './WorkingAgreements.jsx';


const wrappedData = (handler1, handler2, handler3, onData, defaultData, data) => {
    if (handler1.ready() && handler2.ready() && handler3.ready()) {
        onData(null, {
            ...defaultData,
            ...data,
        });
    }
};

const composer = ({ params: { sprintId } }, onData) => {
    const workingAgreement = Meteor.subscribe('WorkingAgreements', sprintId);
    const sprintHandler = Meteor.subscribe('singleSprint', sprintId);
    const deleteWorkingAgreement = workingAgreementActions.deleteWorkingAgreement;

    if (workingAgreement.ready() && sprintHandler.ready()) {
        let workingAgreements = workingAgreementCollection.find().fetch();
        const userId = Meteor.userId();

        const sprint = Sprints.findOne(sprintId);
        const projectId = sprint.projectId;
        const projectsHandler = Meteor.subscribe('singleProject', projectId);

        if (projectsHandler.ready()) {
            const isMember = isProjectMember(projectId, userId);
            const isModerator = isProjectModerator(projectId, userId);

            let defaultData;

            const removeWorkingAgreement = (id) => {
                const idToRemove = id;

                deleteWorkingAgreement(id).catch((error) => {
                    workingAgreements = workingAgreementCollection.find().fetch();
                    wrappedData(workingAgreement,
                        projectsHandler,
                        sprintHandler,
                        onData,
                        defaultData, {
                            errorRemove: error.toString(),
                            idToRemove,
                            workingAgreements,
                        });
                });
            };

            const addWorkingAgreement = async (sprintID, text, date) => {
                try {
                    await workingAgreementActions.createWorkingAgreement(sprintID, text, date);
                    workingAgreements = workingAgreementCollection.find().fetch();
                    wrappedData(workingAgreement,
                        projectsHandler,
                        sprintHandler,
                        onData,
                        defaultData, {
                            openSnackbar: true,
                            workingAgreements,
                        });
                } catch (error) {
                    wrappedData(workingAgreement,
                        projectsHandler,
                        sprintHandler,
                        onData,
                        defaultData, {
                            errorAdd: error,
                        });
                }
            };

            const closeSnackBar = () => {
                wrappedData(workingAgreement, projectsHandler, sprintHandler, onData, defaultData, {
                    openSnackbar: false,
                    workingAgreements,
                });
            };

            defaultData = {
                addWorkingAgreement,
                removeWorkingAgreement,
                workingAgreements,
                sprintId,
                isModerator,
                isMember,
                isClosed: sprint.closed,
                closeSnackBar,
            };

            wrappedData(workingAgreement, projectsHandler, sprintHandler, onData, defaultData);
        }
    }
};

export default withRouter(
    composeWithTracker(
        composer,
    )(WorkingAgreements),
);
