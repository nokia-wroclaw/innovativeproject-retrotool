import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { FullPageLoader } from '/imports/components/Loaders';
import {
    isAdmin,
    isLoggedIn,
} from '/imports/api/users';
import { getProjectName } from '/imports/api/projects';
import MainLayout from './MainLayout.jsx';

const composer = ({ params: { projectId, sprintId } }, onData) => {
    const userHandler = Meteor.subscribe('extendedUser');

    if (userHandler.ready()) {
        const isLoggedInUser = isLoggedIn();
        const isCurrentUserAdmin = isAdmin();

        const title = getProjectName(projectId) || 'Retro Tool';

        onData(null, {
            title,
            isLoggedInUser,
            isCurrentUserAdmin,
            projectId,
            sprintId,
        });
    }
};

export default composeWithTracker(
    composer,
    FullPageLoader,
)(MainLayout);
