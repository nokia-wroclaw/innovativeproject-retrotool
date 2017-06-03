import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { FullPageLoader } from '/imports/components/Loaders';
import {
    isAdmin,
    isLoggedIn,
} from '/imports/api/users';
import {
    Sprints,
} from '/imports/api/sprints';
import { getProjectName } from '/imports/api/projects';
import MainLayout from './MainLayout.jsx';


const composer = ({ params: { projectId, sprintId }, location: { pathname } }, onData) => {
    const userHandler = Meteor.subscribe('extendedUser');
    const sprintListHandler = Meteor.subscribe('sprintList', projectId);

    if (userHandler.ready() && sprintListHandler.ready()) {
        const isLoggedInUser = isLoggedIn();
        const isCurrentUserAdmin = isAdmin();

        const title = getProjectName(projectId) || 'Retro Tool';

        const sprint = Sprints.findOne({ projectId, closed: false });
        const currentOrOpenSprintId = !sprintId && sprint ? sprint._id : sprintId;

        onData(null, {
            title,
            isLoggedInUser,
            isCurrentUserAdmin,
            projectId,
            sprintId: currentOrOpenSprintId,
            pathname,
        });
    }
};

export default composeWithTracker(
    composer,
    FullPageLoader,
)(MainLayout);
